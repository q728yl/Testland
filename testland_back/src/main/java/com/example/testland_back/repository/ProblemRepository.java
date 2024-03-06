package com.example.testland_back.repository;

import com.example.testland_back.entity.Problem;
import com.example.testland_back.entity.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProblemRepository extends JpaRepository<Problem, Long> {
    Problem findProblemByProblemId(Long  problemId);
    List<Problem> findAll();
    Problem findProblemByProblemTitle(String problemTitle);
    Page<Problem> findAll(Pageable pageable);
    Page<Problem> findProblemsByCategoryId(Long categoryId, Pageable pageable);
    Page<Problem> findProblemsByTagsContaining(Tag tag, Pageable pageable);
    Page<Problem> findProblemsByProblemTitleContaining(String keyword, Pageable pageable);
    Page<Problem> findProblemsByDifficulty(Integer difficulty, Pageable pageable);
    Page<Problem> findProblemsByProblemTitleContainingAndCategoryIdAndTagsContainsAndDifficulty(String keyword, Long categoryId, Tag tag, Integer difficulty, Pageable pageable);
    Page<Problem> findProblemsByProblemTitleContainingAndCategoryIdAndDifficulty(String keyword, Long categoryId, Integer difficulty, Pageable pageable);
    Page<Problem> findProblemsByProblemTitleContainingAndTagsContainsAndDifficulty(String keyword, Tag tag, Integer difficulty, Pageable pageable);
    Page<Problem> findProblemsByCategoryIdAndTagsContainsAndDifficulty(Long categoryId, Tag tag, Integer difficulty, Pageable pageable);
    Page<Problem> findProblemsByProblemTitleContainingAndCategoryId(String keyword, Long categoryId, Pageable pageable);
    Page<Problem> findProblemsByProblemTitleContainingAndTagsContains(String keyword, Tag tag, Pageable pageable);
    Page<Problem> findProblemsByCategoryIdAndDifficulty(Long categoryId, Integer difficulty, Pageable pageable);
    Page<Problem> findProblemsByTagsContainsAndDifficulty(Tag tag, Integer difficulty, Pageable pageable);
    Page<Problem> findProblemsByProblemTitleContainingAndDifficulty(String keyword, Integer difficulty, Pageable pageable);
    Page<Problem> findProblemsByCategoryIdAndTagsContains(Long categoryId, Tag tag, Pageable pageable);
    Page<Problem> findProblemsByProblemTitleContainingAndCategoryIdAndTagsContains(String keyword, Long categoryId, Tag tag, Pageable pageable);

}
