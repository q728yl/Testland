package com.example.testland_back.dao;

import  com.example.testland_back.entity.User;
import  com.example.testland_back.entity.UserAuth;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Map;

public interface UserDao {
    // userId找用户
    User  findUserByUid(Long uid);
    // 用户名找用户
    User findUserByUsername(String username);
    // userId找userAuth
    UserAuth getUserAuth(Long uid);
    User addUser(Map<String, String> input);
    boolean changeUserStatus(String username);
    List<User> getUserList();
    Page<User> getUserListByPage(Pageable pageable);
    boolean setSalt(String username, String salt);
    Page<User> getUsersByKeyword(String keyword, Pageable pageable);
    void updateActiveTime(Long uid);
}
