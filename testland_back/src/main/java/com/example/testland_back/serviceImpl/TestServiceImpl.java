package com.example.testland_back.serviceImpl;

import com.example.testland_back.config.RabbitMQProducer;
import com.example.testland_back.dao.ProblemDao;
import com.example.testland_back.dao.TestDao;
import com.example.testland_back.dao.UserDao;
import com.example.testland_back.entity.*;
import com.example.testland_back.service.ProblemService;
import com.example.testland_back.service.TestService;
import com.example.testland_back.util.Msg;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class TestServiceImpl implements TestService {
    @Autowired
    private TestDao testDao;
    @Autowired
    private UserDao userDao;
    @Autowired
    private ProblemDao problemDao;
    @Autowired
    private RabbitTemplate rabbitTemplate;


    public TestServiceImpl(TestDao testDao, UserDao userDao, ProblemDao problemDao,RabbitTemplate rabbitTemplate) {
        this.testDao = testDao;
        this.userDao = userDao;
        this.problemDao = problemDao;
        this.rabbitTemplate = rabbitTemplate;
    }

    @Override
    public Msg test(Long userId, Long problemId,String language, String code){
        Problem problem = problemDao.getProblemById(problemId);
        User user = userDao.findUserByUid(userId);
        if(user==null){
            return new Msg(-1, "该用户不存在", null);
        }
        if(problem==null){
            return new Msg(-1, "该问题不存在", null);
        }
        System.out.println(problemId);
        // 检查用户最近一次提交本题代码的时间
        UserTest userTest = testDao.getLatestUserTest(userId, problemId);
        System.out.println(userTest);
        if(userTest != null){
            LocalDateTime now = LocalDateTime.now();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            System.out.println(formatter);
            LocalDateTime latest = LocalDateTime.parse(userTest.getTimeStamp(), formatter);
            java.time.Duration duration = java.time.Duration.between(latest, now);
            if(duration.toSeconds()<=4){
                System.out.println("频繁提交");
                return new Msg(-1, "请勿频繁提交,5s后可重新提交", null);
            }
        }

        String testcaseAddr = problem.getTestPath();
        System.out.println(testcaseAddr);
        // 构建文件名
        String filename = userId + "-" + problemId + "-" + language;

        // 检查目录中是否有同名文件
        int attempt = 1;
        String extension = "";
        if (language.equals("cpp")) {
            extension = ".cpp";
        } else if (language.equals("python")) {
            extension = ".py";
        } else {
            return new Msg(-1, "不支持的语言类型", null);
        }

        String path = "/home/testland_data/user_code/" + filename + extension;
        while (Files.exists(Paths.get(path))) {
            filename = userId + "-" + problemId + "-" + language + "-" + attempt;
            path = "/home/testland_data/user_code/" + filename + extension;
            attempt++;
        }

        try {
            Path filePath = Files.createFile(Paths.get(path));
            try (BufferedWriter writer = Files.newBufferedWriter(filePath)) {
                writer.write(code);
            }
            System.out.println("代码保存成功：" + filePath);

            // 没回答过新建一个userProblem关联，并新建一个userTest存储时间（不维护其他任何信息）
            UserTest userTest1 = testDao.connectUserProblem(userId, problemId, language, filePath.toString());
            if(userTest1 == null)
                return new Msg(-1, "用户问题建立联系失败", null);

            // 构建消息内容
            Map<String, String> message = new HashMap<>();
            message.put("userId", String.valueOf(userId));
            message.put("problemId", String.valueOf(problemId));
            message.put("userTestId", String.valueOf(userTest1.getUserTestId()));
            message.put("language", language);
            message.put("codePath", filePath.toString());
            message.put("testcasesPath", testcaseAddr);
            //将代码地址保存在数据库！！


            // 转换消息内容为字节数组
            ObjectMapper objectMapper = new ObjectMapper();
            byte[] payload = objectMapper.writeValueAsBytes(message);
            //生产者发送数据
            rabbitTemplate.convertAndSend(RabbitMQProducer.TEST_EXCHANGE, "boot.haha",payload);
            return new Msg(1, "代码保存成功", filePath);
        } catch (IOException e) {
            e.printStackTrace();
            return new Msg(-1, "代码保存失败", null);
        }

    }

    @Override
    public Msg updateTestInfo(Map<String, Object> message) {
        if((Integer) message.get("result") == 6){
            User user = userDao.findUserByUid(Long.parseLong((String) message.get("userId")));
            userDao.changeUserStatus(user.getUsername());
            UserProblem userProblem = testDao.getUserProblem(Long.parseLong((String) message.get("userId")), Long.parseLong((String) message.get("problemId")));
            if(userProblem == null)
                return new Msg(-1, "该用户没有回答过该问题", null);
            UserTest userTest = testDao.updateUserTest(message);
            if(userTest == null)
                return new Msg(-1, "更新测试信息失败", null);
            return new Msg(-2, "该用户提交危险代码", null);
        }
        UserProblem userProblem = testDao.getUserProblem(Long.parseLong((String) message.get("userId")), Long.parseLong((String) message.get("problemId")));
        if(userProblem == null)
            return new Msg(-1, "该用户没有回答过该问题", null);
        UserTest userTest = testDao.updateUserTest(message);
        if(userTest == null)
            return new Msg(-1, "更新测试信息失败", null);
        return new Msg(1, "更新测试信息成功", null);
    }


    @Override
    public Msg getTestInfo(Long userId, Long problemId) {
        UserTest userTest = testDao.getLatestUserTest(userId, problemId);
        if(userTest == null)
            return new Msg(-1, "获取测试信息失败", null);
        List<UserTestcase> userTestcases = userTest.getUserTestcases();
        if(userTestcases == null)
            return new Msg(-1, "获取测试用例信息失败", null);
        Map<String, Object> result = new HashMap<>();
        result.put("timeStamp", userTest.getTimeStamp());
        result.put("result", userTest.getResult());
        result.put("score", userTest.getScore());
        result.put("language", userTest.getLanguage());
        result.put("userTestcases", userTestcases);
        return new Msg(1, "获取测试信息成功", result);
    }

    @Override
    public Msg getTestHistory(Long userId, Long problemId) {
        List<UserTest> userTests = testDao.getUserTestHistory(userId, problemId);
        System.out.println(userTests);
        if(userTests == null)
            return new Msg(-1, "获取测试历史失败", null);
        List<Map<String, Object>> result = new ArrayList<>();
        for(UserTest userTest : userTests) {
            Map<String, Object> temp = new HashMap<>();
            temp.put("userTestId", userTest.getUserTestId().toString());
            temp.put("timeStamp", userTest.getTimeStamp());
            if(userTest.getResult()==null){
                return new Msg(-1,"正在测评",null);
            }

            temp.put("result", Integer.toString(userTest.getResult()));
            temp.put("score", userTest.getScore().toString());
            temp.put("language", userTest.getLanguage());
            List<Map<String, Object>> userTestcases = new ArrayList<>();
            for(UserTestcase userTestcase : userTest.getUserTestcases()) {
                Map<String, Object> temp2 = new HashMap<>();
                temp2.put("testcaseId", userTestcase.getUserTestcaseId().toString());
                temp2.put("result", userTestcase.getResult().toString());
                temp2.put("score", userTestcase.getScore().toString());
                temp2.put("time", userTestcase.getTime());
                temp2.put("memory", userTestcase.getMemory());
                userTestcases.add(temp2);
            }
            temp.put("userTestcases", userTestcases);
            result.add(temp);
        }
        return new Msg(1, "获取测试历史成功", result);
    }


    @Override
    public Msg getUserTest(Long UserTestId) {
        UserTest userTest = testDao.getUserTest(UserTestId);
        if(userTest == null)
            return new Msg(-1, "获取测试信息失败", null);
        Map<String, Object> result = new HashMap<>();
        result.put("timeStamp", userTest.getTimeStamp());
        result.put("result", userTest.getResult());
        result.put("score", userTest.getScore());
        result.put("language", userTest.getLanguage());
        result.put("userTestcases", userTest.getUserTestcases());
        return new Msg(1, "获取测试信息成功", result);
    }

    @Override
    public Msg getCodeHistory(Long userTestId) {
        UserTest userTest = testDao.getUserTest(userTestId);
        if (userTest == null)
            return new Msg(-1, "获取测试信息失败", null);
        String path = userTest.getAddress();

        try {
            File file = new File(path);
            Scanner scanner = new Scanner(file);

            StringBuilder codeBuilder = new StringBuilder();
            while (scanner.hasNextLine()) {
                String line = scanner.nextLine();
                codeBuilder.append(line).append("\n");
            }
            scanner.close();

            String code = codeBuilder.toString();
            return new Msg(1, "获取代码成功", code);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
            return new Msg(-1, "文件不存在", null);
        }
    }


}
