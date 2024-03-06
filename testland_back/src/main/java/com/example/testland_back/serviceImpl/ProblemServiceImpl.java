package com.example.testland_back.serviceImpl;
import com.example.testland_back.dao.ProblemDao;
import com.example.testland_back.entity.Category;
import com.example.testland_back.entity.Example;
import com.example.testland_back.entity.Tag;
import com.example.testland_back.service.ProblemService;
import com.example.testland_back.util.FileOperation;
import com.example.testland_back.util.Msg;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.example.testland_back.entity.Problem;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import java.io.*;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.*;

import static com.example.testland_back.util.FileOperation.clearDirectoryContents;


@Service
public class ProblemServiceImpl implements ProblemService {
    @Autowired
    private ProblemDao problemDao;

    public ProblemServiceImpl(ProblemDao problemDao) {
        this.problemDao = problemDao;
    }

    @Override
    public List<Map<String, Object>> packageProblem(List<Problem> problems) {
        List<Map<String, Object>> result = new ArrayList<>();
        for (Problem problem : problems) {
            Map<String, Object> map = new HashMap<>();
            map.put("problemId", problem.getProblemId().toString());
            map.put("problemTitle", problem.getProblemTitle());
            map.put("difficulty", problem.getDifficulty().toString());
            map.put("updateTime", problem.getUpdateTime());
            BigDecimal passRate;
            if (problem.getTestCount() != 0)
                passRate = BigDecimal.valueOf(problem.getAcCount()).divide(BigDecimal.valueOf(problem.getTestCount()), 2, BigDecimal.ROUND_HALF_UP);
            else
                passRate = BigDecimal.ZERO;
            map.put("passRate", passRate.toString());
            List<Tag> tags = problem.getTags();
            List<String> tagList = new ArrayList<>();
            for (Tag tag : tags) {
                tagList.add(tag.getContent());
            }
            map.put("tags", tagList);
            result.add(map);
        }
        return result;
    }
    @Override
    public Msg getAllProblemByPage(Integer page, Integer size){
        Pageable pageable = PageRequest.of(page - 1, size);
        Page<Problem> problems =problemDao.getAllProblem(pageable);
        if(problems==null){
            return new Msg(-1, "当前页已无任何题目");
        }
        return new Msg(1, " ", packageProblem(problems.getContent()));
    }

    @Override
    public Msg getProblemById(Long id) {
        Problem problem = problemDao.getProblemById(id);
        if (problem == null)
            return new Msg(-1, "数据库中没有该题目");
        Map<String, Object> map = new HashMap<>();
        map.put("problemId", problem.getProblemId());
        map.put("problemTitle", problem.getProblemTitle());
        map.put("description", problem.getDescription());
        map.put("difficulty", problem.getDifficulty());
        map.put("hint", problem.getHint());
        map.put("testPath", problem.getTestPath());
        map.put("testCount", problem.getTestCount());
        map.put("acCount", problem.getAcCount());
        map.put("waCount", problem.getWaCount());
        map.put("tleCount", problem.getTleCount());
        map.put("mleCount", problem.getMleCount());
        map.put("reCount", problem.getReCount());
        map.put("updateTime", problem.getUpdateTime());
        map.put("categoryId", problem.getCategoryId());
        map.put("category", problemDao.getCategoryById(problem.getCategoryId()).getContent());
        map.put("examples", problem.getExamples());
        map.put("tags", problem.getTags());

        return new Msg(1, " ", map);
    }

    @Override
    public Msg getProblemByTag(String tag) {
        List<Problem> problems = problemDao.getProblemByTag(tag);
        if (problems.size() == 0)
            return new Msg(-1, "数据库中没有该题目");
        return new Msg(1, " ", packageProblem(problems));
    }

    @Override
    public Msg getProblemByTagAndPage(String tag, Integer page, Integer size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        Page<Problem> problems = problemDao.getProblemByTagAndPage(tag, pageable);
        if (problems == null)
            return new Msg(-1, "当前页已无任何题目");
        return new Msg(1, " ", packageProblem(problems.getContent()));
    }

    @Override
    public Msg getProblemByCategory(String category) {
        List<Problem> problems = problemDao.getProblemByCategory(category);
        if (problems.size() == 0)
            return new Msg(-1, "数据库中没有该题目");
        return new Msg(1, " ", packageProblem(problems));
    }

    @Override
    public Msg getProblemByCategoryAndPage(String category, Integer page, Integer size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        Page<Problem> problems = problemDao.getProblemByCategoryAndPage(category, pageable);
        if (problems == null)
            return new Msg(-1, "当前页已无任何题目");
        return new Msg(1, " ", packageProblem(problems.getContent()));
    }

    @Override
    public Msg addProblem(Map<String, Object> problem) {
        Problem problem1 = problemDao.getProblemByProblemTitle((String) problem.get("problemTitle"));
        if (problem1 != null)
            return new Msg(-1, "该题目已存在");
        Problem problem2 = problemDao.addProblem(problem);
        if (problem2 == null)
            return new Msg(-1, "添加题目失败");
        String testPath = createTestPath((List<Map<String, String>>) problem.get("testCases"), problem2.getProblemId());
        problemDao.setTestPath(testPath, problem2.getProblemId());
        return new Msg(1, "添加题目成功");
    }

    //    D:\TestLand\data\problem{problemId}\

    @Override
    public Msg updateTestcases(MultipartFile testCasesFile, Long problemId) {
        String folderName = "problem" + problemId;
        String folderPath = "/home/testland_data/problems/" + folderName;
        try {
            File folder = new File(folderPath);
            if (!folder.exists()) {
                folder.mkdirs();
            }else {
                // If the directory exists, clear its contents
                clearDirectoryContents(folder);
            }
            // 获取文件名
            String fileName = StringUtils.cleanPath(testCasesFile.getOriginalFilename());
            // 解压缩文件到临时目录
            String zipFilePath = folderPath + File.separator + fileName;
            Files.copy(testCasesFile.getInputStream(), Path.of(zipFilePath), StandardCopyOption.REPLACE_EXISTING);
            String tempFolderPath = folderPath + File.separator + "temp";
            FileOperation.unzip(zipFilePath, tempFolderPath); // 调用解压方法解压至临时目录
            // 删除原始压缩包
            File zipFile = new File(zipFilePath);
            if (zipFile.exists()) {
                zipFile.delete();
            }
            // 移动文件至上一级目录
            FileOperation.moveFilesToParentDirectory(tempFolderPath, folderPath);
            // 删除临时目录
            FileOperation.deleteDirectory(tempFolderPath);
            System.out.println("Files extracted to: " + folderPath);
            // 返回目录路径
            return new Msg(1, "题目"+problemId+" 更新测试用例成功", null);
        } catch (IOException e) {
            e.printStackTrace();
            // 处理文件操作过程中的异常
            return new Msg(0, "更新测试用例失败", null);
        }

    }
    // Helper method to clear directory contents


    @Override
    public String createTestPath(List<Map<String, String>> test, Long problemId) {
        String folderName = "problem" + problemId;
        String folderPath = "/home/testland_data/problems/" + folderName;

        try {
            File folder = new File(folderPath);
            if (!folder.exists()) {
                folder.mkdirs();
            }

            FileWriter configFileWriter = new FileWriter(folderPath + "/config.txt"); // Use forward slash here
            Integer testNum = test.size();
            configFileWriter.write(testNum.toString() + "\n");

            for (int i = 0; i < test.size(); i++) {
                Map<String, String> testCase = test.get(i);
                String input = testCase.get("input");
                String output = testCase.get("output");
                String inputFileName = (i + 1) + ".in";
                String outputFileName = (i + 1) + ".ans";
                String inputFilePath = folderPath + "/" + inputFileName; // Use forward slash here
                String outputFilePath = folderPath + "/" + outputFileName; // Use forward slash here

                FileWriter inputFileWriter = new FileWriter(inputFilePath);
                inputFileWriter.write(input);
                inputFileWriter.close();

                FileWriter outputFileWriter = new FileWriter(outputFilePath);
                outputFileWriter.write(output);
                outputFileWriter.close();

                configFileWriter.write(inputFileName + "," + outputFileName + ",10\n");
            }
            configFileWriter.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return folderPath;
    }
    @Override
    public Msg addProblemByFile(Map<String, Object> problem,MultipartFile file) {
        Problem problem1 = problemDao.getProblemByProblemTitle((String) problem.get("problemTitle"));
        if (problem1 != null)
            return new Msg(-1, "该题目已存在");
        Problem problem2 = problemDao.addProblem(problem);
        if (problem2 == null)
            return new Msg(-1, "添加题目失败");
        String testPath = createTestPathByFile(file, problem2.getProblemId());
        if(testPath==null){
            return new Msg(-1, "创建测试用例地址失败");
        }
        problemDao.setTestPath(testPath, problem2.getProblemId());
        return new Msg(1, "添加题目成功");
    }

    @Override
    public String createTestPathByFile(MultipartFile testCasesFile, Long problemId) {
        String folderName = "problem" + problemId;
        String folderPath = "/home/testland_data/problems/" + folderName;
        try {
            File folder = new File(folderPath);
            if (!folder.exists()) {
                folder.mkdirs();
            }
            // 获取文件名
            String fileName = StringUtils.cleanPath(testCasesFile.getOriginalFilename());
            // 解压缩文件到临时目录
            String zipFilePath = folderPath + File.separator + fileName;
            Files.copy(testCasesFile.getInputStream(), Path.of(zipFilePath), StandardCopyOption.REPLACE_EXISTING);
            String tempFolderPath = folderPath + File.separator + "temp";
            FileOperation.unzip(zipFilePath, tempFolderPath); // 调用解压方法解压至临时目录
            // 删除原始压缩包
            File zipFile = new File(zipFilePath);
            if (zipFile.exists()) {
                zipFile.delete();
            }
            // 移动文件至上一级目录
            FileOperation.moveFilesToParentDirectory(tempFolderPath, folderPath);
            // 删除临时目录
            FileOperation.deleteDirectory(tempFolderPath);
            System.out.println("Files extracted to: " + folderPath);
            // 返回目录路径
            return folderPath;
        } catch (IOException e) {
            e.printStackTrace();
            // 处理文件操作过程中的异常
            return null;
        }
    }
    // 解压缩方法


    @Override
    public Msg addExample(Map<String, Object> examples) {
        Problem problem = problemDao.getProblemById(Long.parseLong((String) examples.get("problemId")));
        if (problem == null)
            return new Msg(-1, "数据库中没有该题目");
        List<Example> examples1 = problemDao.addExample((List<Map<String, String>>) examples.get("examples"), problem.getProblemId());
        if (examples1 == null)
            return new Msg(-1, "添加样例失败");
        return new Msg(1, "添加样例成功");
    }
@Override
public Msg getCategoryById(Long categoryId){
        Category category = problemDao.getCategoryById(categoryId);
        if(category == null){
            return new Msg(-1, "数据库中没有该分类");
        }
        return  new Msg(1, "获取分类成功",category.getContent());
}

    @Override
    public Msg getCategory() {
        List<Problem> problems = problemDao.getAllProblem();
        List<Map<String, Object>> categoryList = new ArrayList<>();

        // 统计每个分类的问题数量
        for (Problem problem : problems) {
            String category = problemDao.getCategoryById(problem.getCategoryId()).getContent();
            if (category != null) {
                boolean categoryExists = false;

                // 检查当前分类是否已存在于结果列表中
                for (Map<String, Object> categoryMap : categoryList) {
                    String existingCategory = (String) categoryMap.get("category");
                    if (existingCategory != null && existingCategory.equals(category)) {
                        int count = (int) categoryMap.get("count");
                        categoryMap.put("count", count + 1);
                        categoryExists = true;
                        break;
                    }
                }

                // 如果分类不存在于结果列表中，则添加新的分类结构体
                if (!categoryExists) {
                    Map<String, Object> categoryMap = new HashMap<>();
                    categoryMap.put("category", category);
                    categoryMap.put("count", 1);
                    categoryList.add(categoryMap);
                }
            }
        }

        if (categoryList.isEmpty()) {
            return new Msg(0, "题库为空", null);
        }

        // 如果分类数量超过6个，则只返回数量最高的前六个分类
        if (categoryList.size() > 6) {
            categoryList.sort((c1, c2) -> (int) c2.get("count") - (int) c1.get("count"));
            categoryList = categoryList.subList(0, 6);
            return new Msg(1, "获取问题类别成功", categoryList);
        }
        categoryList.sort((c1, c2) -> (int) c2.get("count") - (int) c1.get("count"));
        return new Msg(1, "获取问题类别成功", categoryList);
    }


    @Override
    public Msg deleteProblem(Long problemId) {
        Problem problem = problemDao.getProblemById(problemId);
        if (problem == null)
            return new Msg(-1, "数据库中没有该题目");
        problemDao.deleteProblem(problemId);
        if (problemDao.getProblemById(problemId) != null)
            return new Msg(-1, "删除题目失败");
        return new Msg(1, "删除题目成功");
    }

    @Override
    public Msg getProblemStatistics(Long problemId) {
        Problem problem = problemDao.getProblemById(problemId);
        if (problem == null)
            return new Msg(-1, "数据库中没有该题目");
        Map<String, String> map = new HashMap<>();
        map.put("acCount", problem.getAcCount().toString());
        map.put("waCount", problem.getWaCount().toString());
        map.put("tleCount", problem.getTleCount().toString());
        map.put("mleCount", problem.getMleCount().toString());
        map.put("reCount", problem.getReCount().toString());
        return new Msg(1, "获取题目统计信息成功", map);
    }

    @Override
    public Msg updateProblem(Map<String, Object> problem) {
        Problem problem1 = problemDao.getProblemById(Long.parseLong((String) problem.get("problemId")));
        if(problem1 == null)
            return new Msg(-1, "数据库中没有该题目");
        Problem titleConflict = problemDao.getProblemByProblemTitle((String) problem.get("problemTitle"));
        if(titleConflict != null && !titleConflict.getProblemId().equals(problem1.getProblemId()))
            return new Msg(-1, "该题目标题已存在");
        Problem newProblem = problemDao.updateProblem(problem);
        if (newProblem == null)
            return new Msg(-1, "更新题目失败");
        return new Msg(1, "更新题目成功");
    }

    @Override
    public Msg filtrateProblem(String keyword) {
        List<Problem> problems = problemDao.filtrateProblem(keyword);
        if (problems.size() == 0)
            return new Msg(-1, "数据库中没有该题目");
        return new Msg(1, "获取题目成功", packageProblem(problems));
    }

    @Override
    public Msg filtrateProblemByPage(String keyword, Integer page, Integer size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Problem> problems = problemDao.filtrateProblemsByPage(pageable, keyword);
        if(problems==null){
            return new Msg(-1, "当前页已无任何题目");
        }
        return new Msg(1, " ", packageProblem(problems.getContent()));
    }


    @Override
    public Msg updateExample(Map<String, Object> example) {
        Problem problem = problemDao.getProblemById(Long.parseLong((String) example.get("problemId")));
        if (problem == null)
            return new Msg(-1, "数据库中没有该题目");
        Example example1 = problemDao.getExampleById(Long.parseLong((String) example.get("exampleId")));
        if (example1 == null)
            return new Msg(-1, "数据库中没有该样例");
        if (!Objects.equals(example1.getProblemId(), problem.getProblemId()))
            return new Msg(-1, "该样例不属于该题目"); // We use Objects.equals() to handle possible null value
        Example newExample = problemDao.updateExample(example);
        if (newExample == null)
            return new Msg(-1, "更新样例失败");
        return new Msg(1, "更新样例成功");
    }


    @Override
    public Msg deleteExample(Long exampleId) {
        boolean result = problemDao.deleteExample(exampleId);
        if(!result)
            return new Msg(-1, "删除样例失败");
        return new Msg(1, "删除样例成功");
    }

    @Override
    public Msg getAllCategoryName() {
        List<Category> categories = problemDao.getCategoryList();
        if(categories.size() == 0)
            return new Msg(-1, "数据库中没有题目分类");
        // System.out.println(categories);
        return new Msg(1, "获取题目分类成功", categories);
    }

    @Override
    public Msg getAllTag() {
        List<Tag> tags = problemDao.getTagList();
        if(tags.size() == 0)
            return new Msg(-1, "数据库中没有题目标签");
        return new Msg(1, "获取题目标签成功", tags);
    }

    @Override
    public Msg selectProblem(Map<String, Object> conditions) {
        String keyword = (String) conditions.get("keyword");
        String category = (String) conditions.get("category");
        String tag = (String) conditions.get("tag");
        Integer difficulty = -1;
        if(conditions.get("difficulty") != null && !conditions.get("difficulty").equals(""))
            difficulty = Integer.parseInt((String) conditions.get("difficulty"));
        Integer page = (Integer) conditions.get("page");
        Integer size = (Integer) conditions.get("size");
        Pageable pageable = PageRequest.of(page, size);
        Page<Problem> problems = problemDao.selectProblem(pageable, keyword, category, tag, difficulty);
        if(problems == null || problems.getContent().size() == 0)
            return new Msg(-1, "当前页已无任何题目");
        return new Msg(1, " ", packageProblem(problems.getContent()));
    }

}
