package com.example.testland_back.daoImpl;

import com.example.testland_back.dao.TestDao;
import com.example.testland_back.entity.*;
import com.example.testland_back.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Repository
public class TestDaoImpl implements TestDao {
    @Autowired
    private UserProblemRepository userProblemRepository;
    @Autowired
    private UserTestRepository userTestRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProblemRepository problemRepository;
    @Autowired
    private UserTestcaseRepository userTestcaseRepository;

//    @Override
//    public List<UserProblem> findUserProblemsByUserId(Long userId) {
//        return userProblemRepository.findUserProblemsByUserId(userId);
//    }
    @Override
    public UserTest connectUserProblem(Long userId, Long problemId, String language, String codePath){
        UserProblem userProblem = userProblemRepository.findUserProblemByUserIdAndProblemId(userId, problemId);
        if(userProblem == null){
            userProblem = new UserProblem();
            userProblem.setUserId(userId);
            userProblem.setProblemId(problemId);
            userProblemRepository.save(userProblem);
            // 更新user中的userproblems
            UserProblem userProblem1 = userProblemRepository.findUserProblemByUserIdAndProblemId(userId, problemId);
            User user = userRepository.findUserByUserId(userId);
            if(user.getUserproblems() == null){
                List<UserProblem> userProblems = new ArrayList<>();
                userProblems.add(userProblem1);
                user.setUserproblems(userProblems);
            }
            else{
                user.getUserproblems().add(userProblem1);
            }
            userRepository.save(user);
        }
        // 更新user 的testCount
        User user = userRepository.findUserByUserId(userId);
        if(user.getTryCount() == null){
            user.setTryCount(1);
        }
        else{
            user.setTryCount(user.getTryCount() + 1);
        }
        userRepository.save(user);
        // 更新problem 的testCount
        Problem problem = problemRepository.findProblemByProblemId(problemId);
        if(problem.getTestCount() == null){
            problem.setTestCount(1);
        }
        else{
            problem.setTestCount(problem.getTestCount() + 1);
        }
        // 更新userproblem中的testCount
        UserProblem userProblem1 = userProblemRepository.findUserProblemByUserIdAndProblemId(userId, problemId);
        if(userProblem1 == null){
            return null;
        }
        if(userProblem1.getTestCount() == null){
            userProblem1.setTestCount(1);
        }
        else{
            userProblem1.setTestCount(userProblem1.getTestCount() + 1);
        }
        userProblemRepository.save(userProblem1);

        // 新建userTest
        UserTest userTest = new UserTest();
        userTest.setUserProblemId(userProblem1.getUserProblemId());
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime now = LocalDateTime.now();
        String formattedTime = now.format(formatter);
        userTest.setTimeStamp(formattedTime);
        userTest.setLanguage(language);
        userTest.setAddress(codePath);
        userTestRepository.save(userTest);
        return userTest;
    }

    @Override
    public UserTest updateUserTest(Map<String, Object> message) {
        UserTest userTest = userTestRepository.findByUserTestId(Long.parseLong((String)message.get("userTestId")));

        List<Map<String, Object>> testCaseInfo = (List<Map<String, Object>>)message.get("testCaseInfo");
        Integer result = (Integer) message.get("result");
        Double score = 0.0;
        for(Map<String, Object> testCase : testCaseInfo){
            score = score + (Double)testCase.get("score");
            UserTestcase userTestcase = new UserTestcase();
            userTestcase.setUserTestId(userTest.getUserTestId());
            userTestcase.setResult((Integer) testCase.get("result"));
            userTestcase.setTime(testCase.get("time").toString());
            userTestcase.setMemory(testCase.get("memory").toString());
            userTestcase.setScore((Double) testCase.get("score"));
            userTestcaseRepository.save(userTestcase);
        }

        // 更新测试结果
        updateTestInfo(result, score, Long.parseLong((String)message.get("userId")), Long.parseLong((String)message.get("problemId")), userTest.getUserTestId());
        return userTest;
    }

    @Override
    public void updateTestInfo(Integer result, Double score, Long userId, Long problemId, Long userTestId) {
        UserTest userTest = userTestRepository.findByUserTestId(userTestId);
        if (userTest == null){
            System.out.println("userTest is null");
            return;
        }
        userTest.setResult(result);
        userTest.setScore(score);
        userTestRepository.save(userTest);

        UserProblem userProblem = userProblemRepository.findUserProblemByUserIdAndProblemId(userId, problemId);
        if (userProblem == null){
            System.out.println("userProblem is null");
            return;
        }
        if (result == 0)
            userProblem.setProblemStatus(1);
        userProblemRepository.save(userProblem);

        User user = userRepository.findUserByUserId(userId);
        if (user == null){
            System.out.println("user is null");
            return;
        }
        if (result == 0) {
            if (user.getPassCount() == null)
                user.setPassCount(1);
            else
                user.setPassCount(user.getPassCount() + 1);
        }
        userRepository.save(user);


        Problem problem = problemRepository.findProblemByProblemId(problemId);
        if(problem == null){
            System.out.println("problem is null");
            return;
        }
        switch (result){
            case 0:
                if(problem.getAcCount() == null)
                    problem.setAcCount(1);
                else
                    problem.setAcCount(problem.getAcCount() + 1);
                break;
            case 1:
                if (problem.getWaCount() == null)
                    problem.setWaCount(1);
                else
                    problem.setWaCount(problem.getWaCount() + 1);
                break;
            case 2:
                if (problem.getTleCount() == null)
                    problem.setTleCount(1);
                else
                    problem.setTleCount(problem.getTleCount() + 1);
                break;
            case 3:
                if (problem.getMleCount() == null)
                    problem.setMleCount(1);
                else
                    problem.setMleCount(problem.getMleCount() + 1);
                break;
            case 4:
                if (problem.getReCount() == null)
                    problem.setReCount(1);
                else
                    problem.setReCount(problem.getReCount() + 1);
                break;
            default:
                break;
        }
        problemRepository.save(problem);
    }
    @Override
    public UserTest getLatestUserTest(Long userId, Long problemId){
        UserProblem userProblem = userProblemRepository.findUserProblemByUserIdAndProblemId(userId, problemId);
        if(userProblem == null)
            return null;
        List<UserTest> userTests = userTestRepository.findUserTestsByUserProblemId(userProblem.getUserProblemId());
        if(userTests == null || userTests.size() == 0)
            return null;
        else {
            UserTest userTest = userTests.get(userTests.size() - 1);
            return userTest;
        }
    }

    @Override
    public List<UserTest> getUserTestHistory(Long userId, Long problemId) {
        UserProblem userProblem = userProblemRepository.findUserProblemByUserIdAndProblemId(userId, problemId);
        System.out.println("testDaoImpl的userProblem"+userProblem);
        if (userProblem == null) {
            System.out.println(1);
            return null;
        }
        List<UserTest> userTests = userTestRepository.findUserTestsByUserProblemId(userProblem.getUserProblemId());

        if (userTests == null || userTests.size() == 0) {
            System.out.println(2);
            return null;
        }
        else {
            System.out.println("3"+userTests);
            return userTests;
        }
    }

    @Override
    public UserTest getUserTest(Long userTestId) {
        UserTest userTest = userTestRepository.findByUserTestId(userTestId);
        if (userTest == null)
            return null;
//        List<UserTestcase> userTestcases = userTestcaseRepository.findUserTestcasesByUserTestId(userTestId);
//        userTest.setUserTestcases(userTestcases);
        return userTest;
    }

    @Override
    public List<UserProblem> getUserProblemsByUserId(Long userId) {
        List<UserProblem> userProblems = userProblemRepository.findUserProblemsByUserId(userId);
        if (userProblems == null || userProblems.size() == 0)
            return null;
        else {
            return userProblems;
        }
    }

    @Override
    public UserProblem getUserProblem(Long userId, Long problemId) {
        UserProblem userProblem = userProblemRepository.findUserProblemByUserIdAndProblemId(userId, problemId);
        if (userProblem == null)
            return null;
        return userProblem;
    }
}

