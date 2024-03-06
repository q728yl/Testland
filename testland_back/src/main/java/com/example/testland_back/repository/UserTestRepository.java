package com.example.testland_back.repository;

import com.example.testland_back.entity.UserTest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserTestRepository extends JpaRepository<UserTest, Long> {
    UserTest findAllByUserProblemId(Long userProblemId);

    UserTest findByUserTestId(Long userTestId);
    List<UserTest> findUserTestsByUserProblemId(Long userProblemId);
}
