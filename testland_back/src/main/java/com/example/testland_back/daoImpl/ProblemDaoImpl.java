package com.example.testland_back.daoImpl;

import com.example.testland_back.dao.ProblemDao;
import com.example.testland_back.entity.*;
import com.example.testland_back.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Repository
public class ProblemDaoImpl implements ProblemDao {
    @Autowired
    private ProblemRepository problemRepository;
    @Autowired
    private TagRepository tagRepository;
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private ExampleRepository exampleRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserProblemRepository userProblemRepository;

    @Override
    public List<Problem> getAllProblem() {
        return problemRepository.findAll();
    }
    @Override
    public Page<Problem> getAllProblem(Pageable pageable) {
        return problemRepository.findAll(pageable);
    }

    @Override
    public Problem getProblemById(Long id) {
        return problemRepository.findProblemByProblemId(id);
    }
    @Override
    public Problem getProblemByPId(Long id){
        return problemRepository.findProblemByProblemId(id);
    }
    @Override
    public List<Problem> getProblemByTag(String tag) {
        Tag tag1 = tagRepository.findTagByContent(tag);
        if(tag1 == null)
            return null;
        return tag1.getProblems();
    }

    @Override
    public Page<Problem> getProblemByTagAndPage(String tag, Pageable pageable) {
        Tag tag1 = tagRepository.findTagByContent(tag);
        if(tag1 == null)
            return null;
        return problemRepository.findProblemsByTagsContaining(tag1, pageable);
    }

    @Override
    public List<Problem> getProblemByCategory(String category) {
        Category category1 = categoryRepository.findCategoryByContent(category);
        if(category1 == null)
            return null;
        return category1.getProblems();
    }

    @Override
    public Page<Problem> getProblemByCategoryAndPage(String category, Pageable pageable) {
        Category category1 = categoryRepository.findCategoryByContent(category);
        if(category1 == null)
            return null;
        return problemRepository.findProblemsByCategoryId(category1.getCategoryId(), pageable);
    }

    @Override
    public Problem getProblemByProblemTitle(String problemTitle) {
        return problemRepository.findProblemByProblemTitle(problemTitle);
    }

    @Override
    public Problem addProblem(Map<String, Object> problem){
        Problem problem1 = new Problem();
        problem1.setProblemTitle((String) problem.get("problemTitle"));
        problem1.setDescription((String) problem.get("description"));
        String difficultyString = (String) problem.get("difficulty");
        if (difficultyString != null) {
            problem1.setDifficulty(Integer.parseInt(difficultyString));
        }
        problem1.setHint((String) problem.get("hint"));
        problem1.setTestCount(0);
        problem1.setAcCount(0);
        problem1.setWaCount(0);
        problem1.setTleCount(0);
        problem1.setReCount(0);
        problem1.setMleCount(0);
        Category category = categoryRepository.findCategoryByContent((String) problem.get("category"));
        if(category != null)
            problem1.setCategoryId(category.getCategoryId());
        else{
            Category category1 = new Category();
            category1.setContent((String) problem.get("category"));
            categoryRepository.save(category1);
            problem1.setCategoryId(category1.getCategoryId());
        }
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime now = LocalDateTime.now();
        String formattedTime = now.format(formatter);
        problem1.setUpdateTime(formattedTime);

        List<Tag> tags = new ArrayList<>();
        List<String> inputs = (List<String>) problem.get("tags");
        if (inputs != null) {
            for(String tag: inputs){
                Tag tag1 = tagRepository.findTagByContent(tag);
                if(tag1 == null){
                    Tag tag2 = new Tag();
                    tag2.setContent(tag);
                    tagRepository.save(tag2);
//                    tag2.getProblems().add(problem1);
                    if(tag2.getProblems() == null)
                        tag2.setProblems(new ArrayList<>());
                    tag2.getProblems().add(problem1);
                    tags.add(tag2);
                }
                else{
                    tag1.getProblems().add(problem1);
                    tags.add(tag1);
                }
            }
        }
        problem1.setTags(tags);
        problemRepository.save(problem1);

        Problem problem2 = problemRepository.findProblemByProblemTitle(problem1.getProblemTitle());
        List<Map<String, String>> exampleInputs = (List<Map<String, String>>) problem.get("examples");
        problem2.setExamples(addExample(exampleInputs, problem2.getProblemId()));

        return problem2;
    }

    @Override
    public void setTestPath(String testPath, Long id) {
        Problem  problem = problemRepository.findProblemByProblemId(id);
        if(problem == null)
            return;
        problem.setTestPath(testPath);
        problemRepository.save(problem);
    }

    @Override
    public List<Example> addExample(List<Map<String, String>> examples, Long problemId){
        List<Example> exampleList = new ArrayList<>();
        for(Map<String, String> example: examples){
            Example example1 = new Example();
            example1.setInput(example.get("input"));
            example1.setOutput(example.get("output"));
            example1.setExplanation(example.get("explanation"));
            example1.setProblemId(problemId);
            exampleRepository.save(example1);
            exampleList.add(example1);
        }
        return exampleList;

    }

    @Override
    public Category getCategoryById(Long id){
        return categoryRepository.findCategoryByCategoryId(id);
    }
    @Override
    public void deleteProblem(Long problemId){
        Problem problem = problemRepository.findProblemByProblemId(problemId);
        if(problem == null)
            return;
        List<Tag> tags = problem.getTags();
        for(Tag tag: tags){
            tag.getProblems().remove(problem);
            tagRepository.save(tag);
        }
        List<Example> examples = problem.getExamples();
        for(Example example: examples){
            exampleRepository.delete(example);
        }
        List<UserProblem> userProblems = userProblemRepository.findUserProblemsByProblemId(problemId);
        for(UserProblem userProblem: userProblems){
            User user = userRepository.findUserByUserId(userProblem.getUserId());
            user.getUserproblems().remove(userProblem);
            userRepository.save(user);
            userProblemRepository.delete(userProblem);
        }
        problemRepository.delete(problem);
    }

    @Override
    public Problem updateProblem(Map<String, Object> problem) {
        Problem problem1 = problemRepository.findProblemByProblemId(Long.parseLong((String) problem.get("problemId")));
        problem1.setProblemTitle((String) problem.get("problemTitle"));
        problem1.setDescription((String) problem.get("description"));
        String difficultyString = (String) problem.get("difficulty");
        if (difficultyString != null) {
            problem1.setDifficulty(Integer.parseInt(difficultyString));
        }
        problem1.setHint((String) problem.get("hint"));
        Category category = categoryRepository.findCategoryByContent((String) problem.get("category"));
        if (category != null)
            problem1.setCategoryId(category.getCategoryId());
        else {
            Category category1 = new Category();
            category1.setContent((String) problem.get("category"));
            categoryRepository.save(category1);
            problem1.setCategoryId(category1.getCategoryId());
        }
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime now = LocalDateTime.now();
        String formattedTime = now.format(formatter);
        problem1.setUpdateTime(formattedTime);

        List<Tag> tags = new ArrayList<>();
        List<String> inputs = (List<String>) problem.get("tags");
        if (inputs != null) {
            for (String tag : inputs) {
                Tag tag1 = tagRepository.findTagByContent(tag);
                if (tag1 == null) {
                    Tag tag2 = new Tag();
                    tag2.setContent(tag);
                    tagRepository.save(tag2);
                    if(tag2.getProblems() == null)
                        tag2.setProblems(new ArrayList<>());
                    tag2.getProblems().add(problem1);
                    tags.add(tag2);
                } else {
                    tag1.getProblems().add(problem1);
                    tags.add(tag1);
                }
            }
        }
        problem1.setTags(tags);
        problemRepository.save(problem1);
        return problem1;
    }

    @Override
    public List<Problem> filtrateProblem(String keyword) {
        List<Problem> problems = problemRepository.findAll();
        List<Problem> result = new ArrayList<>();
        for (Problem problem : problems) {
            if (problem.getProblemTitle().contains(keyword) || problem.getDescription().contains(keyword)) {
                result.add(problem);
            }
        }
        return result;
    }

    @Override
    public Page<Problem> filtrateProblemsByPage(Pageable pageable, String keyword) {
        return problemRepository.findProblemsByProblemTitleContaining(keyword, pageable);
    }

    @Override
    public Example updateExample(Map<String, Object> example) {
        Example example1 = exampleRepository.findExampleByExampleId(Long.parseLong((String) example.get("exampleId")));
        example1.setInput((String) example.get("input"));
        example1.setOutput((String) example.get("output"));
        example1.setExplanation((String) example.get("explanation"));
        exampleRepository.save(example1);

        Problem problem = problemRepository.findProblemByProblemId(Long.parseLong((String) example.get("problemId")));
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime now = LocalDateTime.now();
        String formattedTime = now.format(formatter);
        problem.setUpdateTime(formattedTime);
        problemRepository.save(problem);
        return example1;
    }

    @Override
    public boolean deleteExample(Long exampleId) {
        Example example = exampleRepository.findExampleByExampleId(exampleId);
        if (example == null)
            return false;
        Long problemId = example.getProblemId();
        exampleRepository.delete(example);

        Problem problem = problemRepository.findProblemByProblemId(problemId);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime now = LocalDateTime.now();
        String formattedTime = now.format(formatter);
        problem.setUpdateTime(formattedTime);
        problemRepository.save(problem);
        return true;
    }

    @Override
    public Example getExampleById(Long exampleId){
        return exampleRepository.findExampleByExampleId(exampleId);
    }

    @Override
    public List<Category> getCategoryList(){
        return categoryRepository.findAll();
    }

    @Override
    public List<Tag> getTagList(){
        return tagRepository.findAll();
    }

    @Override
    public Page<Problem> selectProblem(Pageable pageable, String keyword, String category, String tagName, Integer difficulty) {
        // 检查各个条件是否为空
        boolean isKeywordEmpty = keyword == null || keyword.isEmpty();
        boolean isCategoryIdEmpty = category == null || category.isEmpty();
        boolean isTagEmpty = tagName == null || tagName.isEmpty();
        boolean isDifficultyEmpty = difficulty == -1;
        Long categoryId = null;
        if(!isCategoryIdEmpty) {
            Category category1 = categoryRepository.findCategoryByContent(category);
            categoryId = category1.getCategoryId();
            // System.out.println(categoryId);
        }
        Tag tag = null;
        if(!isTagEmpty) {
            tag = tagRepository.findTagByContent(tagName);
        }

        if (isKeywordEmpty && isCategoryIdEmpty && isTagEmpty && isDifficultyEmpty) {
            System.out.println("all empty");
            // 所有条件为空，返回所有问题
            return problemRepository.findAll(pageable);
        } else if (!isKeywordEmpty && isCategoryIdEmpty && isTagEmpty && isDifficultyEmpty) {
            System.out.println("keyword not empty");
            // 只有关键字非空，根据关键字查询问题
            return problemRepository.findProblemsByProblemTitleContaining(keyword, pageable);
        } else if (isKeywordEmpty && !isCategoryIdEmpty && isTagEmpty && isDifficultyEmpty) {
            System.out.println("categoryId not empty");
            // 只有分类ID非空，根据分类ID查询问题
            return problemRepository.findProblemsByCategoryId(categoryId, pageable);
        } else if (isKeywordEmpty && isCategoryIdEmpty && !isTagEmpty && isDifficultyEmpty) {
            System.out.println("tag not empty");
            // 只有标签非空，根据标签查询问题
            return problemRepository.findProblemsByTagsContaining(tag, pageable);
        } else if (isKeywordEmpty && isCategoryIdEmpty && isTagEmpty && !isDifficultyEmpty) {
            System.out.println("difficulty not empty");
            // 只有难度非空，根据难度查询问题
            return problemRepository.findProblemsByDifficulty(difficulty, pageable);
        } else if (!isKeywordEmpty && !isCategoryIdEmpty && isTagEmpty && isDifficultyEmpty) {
            System.out.println("keyword and categoryId not empty");
            // 关键字和分类ID非空，根据关键字和分类ID查询问题
            return problemRepository.findProblemsByProblemTitleContainingAndCategoryId(keyword, categoryId, pageable);
        } else if (!isKeywordEmpty && isCategoryIdEmpty && !isTagEmpty && isDifficultyEmpty) {
            System.out.println("keyword and tag not empty");
            // 关键字和标签非空，根据关键字和标签查询问题
            return problemRepository.findProblemsByProblemTitleContainingAndTagsContains(keyword, tag, pageable);
        } else if (!isKeywordEmpty && isCategoryIdEmpty && isTagEmpty && !isDifficultyEmpty) {
            System.out.println("keyword and difficulty not empty");
            // 关键字和难度非空，根据关键字和难度查询问题
            return problemRepository.findProblemsByProblemTitleContainingAndDifficulty(keyword, difficulty, pageable);
        } else if (isKeywordEmpty && !isCategoryIdEmpty && !isTagEmpty && isDifficultyEmpty) {
            System.out.println("categoryId and tag not empty");
            // 分类ID和标签非空，根据分类ID和标签查询问题
            return problemRepository.findProblemsByCategoryIdAndTagsContains(categoryId, tag, pageable);
        } else if (isKeywordEmpty && !isCategoryIdEmpty && isTagEmpty && !isDifficultyEmpty) {
            System.out.println("categoryId and difficulty not empty");
            // 分类ID和难度非空，根据分类ID和难度查询问题
            return problemRepository.findProblemsByCategoryIdAndDifficulty(categoryId, difficulty, pageable);
        } else if (isKeywordEmpty && isCategoryIdEmpty && !isTagEmpty && !isDifficultyEmpty) {
            System.out.println("tag and difficulty not empty");
            // 标签和难度非空，根据标签和难度查询问题
            return problemRepository.findProblemsByTagsContainsAndDifficulty(tag, difficulty, pageable);
        } else if (!isKeywordEmpty && !isCategoryIdEmpty && !isTagEmpty && isDifficultyEmpty) {
            System.out.println("keyword and categoryId and tag not empty");
            // 关键字、分类ID和标签非空，根据关键字、分类ID和标签查询问题
            return problemRepository.findProblemsByProblemTitleContainingAndCategoryIdAndTagsContains(keyword, categoryId, tag, pageable);
        } else if (!isKeywordEmpty && !isCategoryIdEmpty && isTagEmpty && !isDifficultyEmpty) {
            System.out.println("keyword and categoryId and difficulty not empty");
            // 关键字、分类ID和难度非空，根据关键字、分类ID和难度查询问题
            return problemRepository.findProblemsByProblemTitleContainingAndCategoryIdAndDifficulty(keyword, categoryId, difficulty, pageable);
        } else if (!isKeywordEmpty && isCategoryIdEmpty && !isTagEmpty && !isDifficultyEmpty) {
            System.out.println("keyword and tag and difficulty not empty");
            // 关键字、标签和难度非空，根据关键字、标签和难度查询问题
            return problemRepository.findProblemsByProblemTitleContainingAndTagsContainsAndDifficulty(keyword, tag, difficulty, pageable);
        } else if (isKeywordEmpty && !isCategoryIdEmpty && !isTagEmpty && !isDifficultyEmpty) {
            System.out.println("categoryId and tag and difficulty not empty");
            // 分类ID、标签和难度非空，根据分类ID、标签和难度查询问题
            return problemRepository.findProblemsByCategoryIdAndTagsContainsAndDifficulty(categoryId, tag, difficulty, pageable);
        } else {
            System.out.println("all not empty");
            // 所有条件都非空，根据所有条件查询问题
            return problemRepository.findProblemsByProblemTitleContainingAndCategoryIdAndTagsContainsAndDifficulty(keyword, categoryId, tag, difficulty, pageable);
        }
    }


}
