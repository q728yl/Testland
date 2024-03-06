package com.example.testland_back.service;
import com.example.testland_back.util.Msg;

import java.util.Map;

public interface UserService {
    // 对比账号密码并返回信息
    Msg check(String username, String password);
    Msg register(Map<String, String> input);
    Msg changeUserStatus(String username);
//    Msg getUserList();
    Msg getUserListByPage(Integer page, Integer pageSize);
    Msg getRankingList();
    Msg getTriedProblemList(Long userId);
    Msg getSalt(String username);
    Msg setSalt(String username, String salt);
    Msg getUsersByKeyword(String keyword, Integer page, Integer pageSize);

}
