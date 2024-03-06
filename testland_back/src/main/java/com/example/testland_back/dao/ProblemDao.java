package com.example.testland_back.dao;

import com.example.testland_back.entity.Category;
import com.example.testland_back.entity.Example;
import com.example.testland_back.entity.Problem;
import com.example.testland_back.entity.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Map;

public interface ProblemDao {
    List<Problem> getAllProblem();

    Page<Problem> getAllProblem(Pageable pageable);

    Problem getProblemById(Long id);
    List<Problem> getProblemByTag(String tag);
    List<Problem> getProblemByCategory(String category);
    Problem getProblemByProblemTitle(String problemTitle);
    Problem addProblem(Map<String, Object> problem);
    void setTestPath(String tesePath, Long id);
    List<Example> addExample(List<Map<String, String>> examples, Long problemId);

    Problem getProblemByPId(Long id);

    Category getCategoryById(Long id);

    void deleteProblem(Long problemId);
    Problem updateProblem(Map<String, Object> problem);
    List<Problem> filtrateProblem(String keyword);
    Example updateExample(Map<String, Object> example);
    boolean deleteExample(Long exampleId);
    Example getExampleById(Long exampleId);
    List<Category> getCategoryList();
    List<Tag> getTagList();
    Page<Problem> getProblemByCategoryAndPage(String category, Pageable pageable);
    Page<Problem> getProblemByTagAndPage(String tag, Pageable pageable);
    Page<Problem> filtrateProblemsByPage(Pageable pageable, String keyword);
    Page<Problem> selectProblem(Pageable pageable, String keyword, String category, String tag, Integer difficulty);
}
