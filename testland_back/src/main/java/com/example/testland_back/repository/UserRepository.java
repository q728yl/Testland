package com.example.testland_back.repository;

import com.example.testland_back.entity.UserProblem;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.testland_back.entity.User;

import java.util.List;

@Repository
public  interface UserRepository extends JpaRepository<User, Long> {
    User findUserByUsername(String username);
    User findUserByUserId(Long userId);
  //  Page<User> findAll(Pageable pageable);

    Page<User> findByUserType(Integer i, Pageable pageable);
    Page<User> findUsersByUsernameContaining(String keyword, Pageable pageable);
}
