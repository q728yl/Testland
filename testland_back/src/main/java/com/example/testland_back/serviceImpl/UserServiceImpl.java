package com.example.testland_back.serviceImpl;

import com.example.testland_back.dao.ProblemDao;
import com.example.testland_back.dao.TestDao;
import com.example.testland_back.entity.Problem;
import com.example.testland_back.entity.User;
import com.example.testland_back.entity.UserAuth;
import com.example.testland_back.entity.UserProblem;
import com.example.testland_back.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.example.testland_back.dao.UserDao;
import com.example.testland_back.util.Msg;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UserServiceImpl implements UserService{
    @Autowired
    private UserDao userDao;
    @Autowired
    private TestDao testDao;
    @Autowired
    private ProblemDao problemDao;

    public UserServiceImpl(UserDao userDao,ProblemDao problemDao,TestDao testDao) {
        this.userDao = userDao;
        this.problemDao = problemDao;
        this.testDao = testDao;
    }

    @Override
    public Msg check(String username, String password) {
        User user = userDao.findUserByUsername(username);
        if(user == null){
            return new Msg(-1, "用户不存在", null);
        }
        if(user.getUserStatus() == 0){
            return new Msg(-1, "该用户已被禁用", null);
        }
        Long uid = user.getUserId();
        UserAuth userAuth = userDao.getUserAuth(uid);
        if(password.equals(userAuth.getPassword())){
            Map<String, Object> userInfo = new HashMap<>();
            userInfo.put("username", user.getUsername());
            userInfo.put("userId", user.getUserId().toString());
            userInfo.put("userType", user.getUserType());
            userInfo.put("userStatus", user.getUserStatus());
            userInfo.put("email", user.getEmail());
            userInfo.put("address", user.getAddress());
            userInfo.put("phone", user.getPhone());
            userInfo.put("avatar", user.getAvatar());
            userDao.updateActiveTime(uid);
            return new Msg(1, "OK", userInfo);
        }
        else{
            return new Msg(-1, "密码错误", null);
        }
    }

    @Override
    public Msg register(Map<String, String> input){
        System.out.println(input);
        User user = userDao.findUserByUsername(input.get("username"));
        if(user == null)
            return new Msg(-1, "用户未设置salt", null);

        User newUser = userDao.addUser(input);
        if(newUser == null)
            return new Msg(-1, "注册失败", null);
        return new Msg(1, "注册成功");
    }
    @Override
    public Msg changeUserStatus(String username) {
        User user = userDao.findUserByUsername(username);
        if(user == null)
            return new Msg(-1, "用户不存在", null);
        if(user.getUserType() == 0)
            return new Msg(-1, "该用户为管理员，无法修改", null);
        if(!userDao.changeUserStatus(username))
            return new Msg(-1, "修改失败", null);
        return new Msg(1, "修改成功");
    }

//    @Override
//    public Msg getUserList(){
//        List<User> users = userDao.getUserList();
//        if(users.size() == 0)
//            return new Msg(-1, "用户列表为空", null);
//        List<Map<String, String>> userList = new ArrayList<>();
//        for (User user : users) {
//            Map<String, String> userInfo = new HashMap<>();
//            userInfo.put("username", user.getUsername());
//            userInfo.put("userId", user.getUserId().toString());
//            userInfo.put("userStatus", user.getUserStatus().toString());
//            userInfo.put("email", user.getEmail());
//            userInfo.put("address", user.getAddress());
//            userInfo.put("phone", user.getPhone());
//            userInfo.put("avatar", user.getAvatar());
//            userList.add(userInfo);
//        }
//        return new Msg(1, "OK", userList);
//    }
    @Override
    public Msg getUserListByPage(Integer page, Integer pageSize){
        Pageable pageable = PageRequest.of(page - 1, pageSize);
        Page<User> users =userDao.getUserListByPage(pageable);
        if(users==null){
            return new Msg(-1, "当前页已无任何用户");
        }
        List<Map<String, String>> userList = new ArrayList<>();
        for (User user : users) {
            Map<String, String> userInfo = new HashMap<>();
            userInfo.put("username", user.getUsername());
            userInfo.put("userId", user.getUserId().toString());
            userInfo.put("userStatus", user.getUserStatus().toString());
            userInfo.put("email", user.getEmail());
            userInfo.put("address", user.getAddress());
            userInfo.put("phone", user.getPhone());
            userInfo.put("avatar", user.getAvatar());
            userList.add(userInfo);
        }
        return new Msg(1, "OK", userList);
    }
    @Override
    public Msg getRankingList() {
        List<User> users = userDao.getUserList();
        if(users.size() == 0)
            return new Msg(-1, "用户列表为空", null);
        List<Map<String, String>> userList = new ArrayList<>();
        for (User user : users) {
            Map<String, String> userInfo = new HashMap<>();
            BigDecimal passRate;
            if(user.getTryCount() != 0)
                passRate = BigDecimal.valueOf(user.getPassCount()).divide(BigDecimal.valueOf(user.getTryCount()), 2, BigDecimal.ROUND_HALF_UP);
            else
                passRate = BigDecimal.ZERO;
            userInfo.put("username", user.getUsername());
            userInfo.put("passRate", passRate.toString());
            userInfo.put("passCount", user.getPassCount().toString());
            userInfo.put("problemCount", user.getUserproblems().size() + "");
            userInfo.put("avatar", user.getAvatar());
            userInfo.put("email", user.getEmail());
            userList.add(userInfo);
        }
        // 按照通过率排序，通过率相同按照做题数排序
        userList.sort((o1, o2) -> {
            Integer passCount1 = Integer.parseInt(o1.get("passCount"));
            Integer passCount2 = Integer.parseInt(o2.get("passCount"));
            if(passCount1.compareTo(passCount2) == 0){
                BigDecimal passRate1 = new BigDecimal(o1.get("passRate"));
                BigDecimal passRate2 = new BigDecimal(o2.get("passRate"));
                return passRate2.compareTo(passRate1);
            }
            return passCount2.compareTo(passCount1);
        });

        return new Msg(1, "OK", userList);
    }

    @Override
    public Msg getTriedProblemList(Long userId) {
        User user = userDao.findUserByUid(userId);
        if(user == null)
            return new Msg(-1, "用户不存在", null);
        List<UserProblem> userProblems = testDao.getUserProblemsByUserId(userId);
        if(userProblems == null || userProblems.size() == 0)
            return new Msg(-1, "该用户未做题", null);
        List<Map<String, Object>> problemList = new ArrayList<>();
        for (UserProblem userProblem : userProblems) {
            Map<String, Object> problemInfo = new HashMap<>();
            problemInfo.put("problemId", userProblem.getProblemId());
            Problem problem = problemDao.getProblemById(userProblem.getProblemId());
            problemInfo.put("problemTitle", problem.getProblemTitle());
            problemInfo.put("problemStatus", userProblem.getProblemStatus());
            problemInfo.put("testCount", userProblem.getTestCount());
            problemInfo.put("tags", problem.getTags());
            problemInfo.put("difficulty", problem.getDifficulty());
            problemList.add(problemInfo);
        }
        return new Msg(1, "OK", problemList);
    }

    @Override
    public Msg getSalt(String username) {
        User user = userDao.findUserByUsername(username);
        if(user == null)
            return new Msg(-1, "用户不存在", null);
        UserAuth userAuth = userDao.getUserAuth(user.getUserId());
        return new Msg(1, "OK", userAuth.getSalt());
    }

    @Override
    public Msg setSalt(String username, String salt) {
        User user = userDao.findUserByUsername(username);
        if(user != null)
            return new Msg(-1, "用户名已存在", null);
        if(!userDao.setSalt(username, salt))
            return new Msg(-1, "设置失败", null);
        return new Msg(1, "OK");
    }

    @Override
    public Msg getUsersByKeyword(String keyword, Integer page, Integer pageSize) {
        Pageable pageable = PageRequest.of(page - 1, pageSize);
        Page<User> users = userDao.getUsersByKeyword(keyword, pageable);
        if(users == null)
            return new Msg(-1, "用户列表为空", null);
        List<Map<String, String>> userList = new ArrayList<>();
        for (User user : users) {
            Map<String, String> userInfo = new HashMap<>();
            userInfo.put("username", user.getUsername());
            userInfo.put("userId", user.getUserId().toString());
            userInfo.put("userStatus", user.getUserStatus().toString());
            userInfo.put("email", user.getEmail());
            userInfo.put("address", user.getAddress());
            userInfo.put("phone", user.getPhone());
            userInfo.put("avatar", user.getAvatar());
            userList.add(userInfo);
        }
        return new Msg(1, "OK", userList);
    }
}
