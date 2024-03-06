package com.example.testland_back.service;

import com.example.testland_back.entity.UserProblem;
import com.example.testland_back.util.Msg;

import java.math.BigDecimal;
import java.util.Map;

public interface TestService {

    Msg test(Long userId, Long problemId, String language, String code);

    Msg updateTestInfo(Map<String, Object> message);
    Msg getTestInfo(Long userId, Long problemId);
    Msg getTestHistory(Long userId, Long problemId);
    Msg getUserTest(Long userTestId);
    Msg getCodeHistory(Long userTestId);
}
