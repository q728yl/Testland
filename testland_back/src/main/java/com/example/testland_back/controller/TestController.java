package com.example.testland_back.controller;

import com.example.testland_back.entity.UserProblem;
import com.example.testland_back.service.ProblemService;
import com.example.testland_back.service.TestService;

import com.example.testland_back.util.Msg;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
public class TestController {
    @Autowired
    private TestService testService;

    public TestController(TestService testService) {
        this.testService = testService;
    }

    @CrossOrigin
    @PostMapping("/test")
    public Msg test(@RequestBody Map<String, String> body) {

        Long userId = Long.valueOf(body.get("userId").toString());
        Long problemId = Long.valueOf(body.get("problemId").toString());
        String language = body.get("language").toString();
        String code = body.get("code");
        System.out.println(code);
        Msg msg = testService.test(userId, problemId, language, code);
//        Msg msg1 = userProblemService.updateUserProblemTestCount(userId,problemId);
        //有了结果以后要更新usertestcases和usertests

        return msg;
    }
    @CrossOrigin
    @PostMapping("/testInfo")
    public ResponseEntity<Msg> testInfo(@RequestBody Map<String, Object> input) {
        Msg result = testService.updateTestInfo(input);
        if (result.getStatus() >= 0) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
        }
    }
    @CrossOrigin
    @PostMapping("/getTestCaseInfo")
    public ResponseEntity<Msg> getTestInfo(@RequestBody Map<String,Object> body) {
        Long userId = Long.valueOf(body.get("userId").toString());
        Long problemId = Long.valueOf(body.get("problemId").toString());

        Msg result = testService.getTestInfo(userId,problemId);
        System.out.println(result);
        if (result.getStatus() >= 0) {

            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
        }
    }

    @CrossOrigin
    @RequestMapping("/getTestHistoryList")
    public ResponseEntity<Msg> getTestHistory(@RequestParam("userId") String userId, @RequestParam("problemId") String problemId) {
        Msg result = testService.getTestHistory(Long.parseLong(userId), Long.parseLong(problemId));
        if (result.getStatus() >= 0) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
        }
    }

    @CrossOrigin
    @RequestMapping("/getTestHistory")
    public ResponseEntity<Msg> getTestHistory(@RequestParam("userTestId") String userTestId) {
        Msg result = testService.getUserTest(Long.parseLong(userTestId));
        if (result.getStatus() >= 0) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
        }
    }


    // 未测试能否正确获取代码并转换成String
    @CrossOrigin
    @RequestMapping("/getCodeHistory")
    public ResponseEntity<Msg> getCodeHistory(@RequestParam("userTestId") String userTestId) {
        Msg result = testService.getCodeHistory(Long.parseLong(userTestId));
        if (result.getStatus() >= 0) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
        }
    }



}
