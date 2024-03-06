package com.example.testland_back.daoImpl;

import com.example.testland_back.entity.User;
import com.example.testland_back.entity.UserAuth;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import com.example.testland_back.repository.UserRepository;
import com.example.testland_back.repository.UserAuthRepository;
import com.example.testland_back.dao.UserDao;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Repository
public class UserDaoImpl implements UserDao{
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserAuthRepository userAuthRepository;

    @Override
    public User findUserByUid(Long uid) {
        return userRepository.findUserByUserId(uid);
    }

    @Override
    public User findUserByUsername(String username) {
        return userRepository.findUserByUsername(username);
    }

    @Override
    public UserAuth getUserAuth(Long uid) {
        return userAuthRepository.findByUserId(uid);
    }

    @Override
    public User addUser(Map<String, String> input){
        User user = userRepository.findUserByUsername(input.get("username"));
        user.setAddress(input.get("address"));
        user.setPhone(input.get("phone"));
        user.setEmail(input.get("email"));
        user.setUserStatus(1);
        user.setUserType(1);
        user.setAvatar(input.get("avatar"));
        user.setPassCount(0);
        user.setTryCount(0);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime now = LocalDateTime.now();
        String formattedTime = now.format(formatter);
        user.setActiveTime(formattedTime);
        userRepository.save(user);
        UserAuth userAuth = userAuthRepository.findByUserId(user.getUserId());
//        String hashedPassword = BCrypt.hashpw(input.get("hashedPassword"), BCrypt.gensalt());
//        userAuth.setPassword(hashedPassword);
        userAuth.setPassword(input.get("hashedPassword"));
        userAuthRepository.save(userAuth);
        return user;
    }

    @Override
    public boolean changeUserStatus(String username) {
        User user = userRepository.findUserByUsername(username);
        if(user == null)
            return false;
        if(user.getUserStatus() == 0)
            user.setUserStatus(1);
        else
            user.setUserStatus(0);
        userRepository.save(user);
        return true;
    }

    @Override
    public List<User> getUserList() {
        List<User> userList = userRepository.findAll();
        List<User> res = new ArrayList<>();
        for(User user : userList){
            if(user.getUserType() == 1)
                res.add(user);
        }
        return res;
    }
    @Override
    public Page<User> getUserListByPage(Pageable pageable) {
        return userRepository.findByUserType(1, pageable);
    }

    @Override
    public boolean setSalt(String username, String salt) {
        User user = new User();
        user.setUsername(username);
        userRepository.save(user);
        UserAuth userAuth = new UserAuth();
        userAuth.setUserId(userRepository.findUserByUsername(username).getUserId());
        userAuth.setSalt(salt);
        userAuthRepository.save(userAuth);
        return true;
    }

    @Override
    public Page<User> getUsersByKeyword(String keyword, Pageable pageable) {
        Page<User> users = userRepository.findUsersByUsernameContaining(keyword, pageable);
        List<User> userList = users.getContent();
        List<User> res = new ArrayList<>();
        for(User user : userList){
            if(user.getUserType() == 1)
                res.add(user);
        }
        return new PageImpl<>(res, pageable, res.size());
    }

    @Override
    public void updateActiveTime(Long uid) {
        User user = userRepository.findUserByUserId(uid);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime now = LocalDateTime.now();
        String formattedTime = now.format(formatter);
        user.setActiveTime(formattedTime);
        userRepository.save(user);
    }

}
