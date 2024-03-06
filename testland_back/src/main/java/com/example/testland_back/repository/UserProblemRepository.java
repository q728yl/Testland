package com.example.testland_back.repository;

import com.example.testland_back.entity.UserProblem;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserProblemRepository extends JpaRepository<UserProblem, Long> {
    List<UserProblem> findUserProblemsByUserId(Long userId);
    List<UserProblem> findUserProblemsByProblemId(Long problemId);

    UserProblem findByUserIdAndProblemId(Long userId,Long problemId);
    @Modifying
    @Transactional
    @Query("UPDATE UserProblem u SET u.testCount =:testCount WHERE u.userId = :userId AND u.problemId = :problemId")
    void updateUserProblemTestCount( @Param("userId")Long userId, @Param("problemId")Long problemId, @Param("testCount") Integer testCount);

    UserProblem findUserProblemByUserIdAndProblemId(Long userId, Long problemId);
}
