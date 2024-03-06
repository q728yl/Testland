package com.example.testland_back.repository;

import com.example.testland_back.entity.User;
import com.example.testland_back.entity.UserAuth;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserAuthRepository extends JpaRepository<UserAuth, Long> {
    UserAuth findByUserId(Long userId);
}
