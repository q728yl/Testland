package com.example.testland_back.dao;

import com.example.testland_back.entity.UserProblem;
import com.example.testland_back.entity.UserTest;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

public interface TestDao {

    UserTest connectUserProblem(Long userId, Long problemId, String language, String codePath);
    UserTest updateUserTest(Map<String, Object> message);
    void updateTestInfo(Integer result, Double score, Long userId, Long problemId, Long userTestId);
    UserTest getLatestUserTest(Long userId, Long problemId);
    List<UserTest> getUserTestHistory(Long userId, Long problemId);
    UserTest getUserTest(Long userTestId);
    List<UserProblem> getUserProblemsByUserId(Long userId);
    UserProblem getUserProblem(Long userId, Long problemId);
}
