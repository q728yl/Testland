package com.example.testland_back.repository;

import com.example.testland_back.entity.UserTestcase;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserTestcaseRepository extends JpaRepository<UserTestcase, Long> {
    List<UserTestcase> findUserTestcasesByUserTestId(Long userTestId);
}
