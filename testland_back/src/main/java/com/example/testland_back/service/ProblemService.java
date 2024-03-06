package com.example.testland_back.service;

import com.example.testland_back.entity.Problem;
import com.example.testland_back.util.Msg;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.Objects;

public interface ProblemService {
    Msg getAllProblemByPage(Integer page, Integer size);
    Msg getProblemById(Long id);
    Msg getProblemByTag(String tag);
    Msg getProblemByTagAndPage(String tag, Integer page, Integer size);
    Msg getProblemByCategory(String category);
    Msg getProblemByCategoryAndPage(String category, Integer page, Integer size);
    Msg addProblem(Map<String, Object> problem);

    //    D:\TestLand\data\problem{problemId}\
    Msg updateTestcases(MultipartFile testCasesFile, Long problemId);

    String createTestPath(List<Map<String, String>> test, Long problemId);
    Msg addProblemByFile(Map<String, Object> problem, MultipartFile file);
    String createTestPathByFile(MultipartFile testCasesFile, Long problemId);
    Msg addExample(Map<String, Object> example);

    Msg getCategoryById(Long categoryId);

    Msg getCategory();
    Msg deleteProblem(Long problemId);
    Msg getProblemStatistics(Long problemId);
    Msg updateProblem(Map<String, Object> problem);
    Msg filtrateProblem(String keyword);
    Msg filtrateProblemByPage(String keyword, Integer page, Integer size);
    Msg updateExample(Map<String, Object> example);
    Msg deleteExample(Long exampleId);
    Msg getAllCategoryName();
    Msg getAllTag();
    List<Map<String, Object>> packageProblem(List<Problem> problems);
    Msg selectProblem(Map<String, Object> conditions);

}
