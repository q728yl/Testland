package com.example.testland_back.controller;

import com.example.testland_back.util.Msg;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.testland_back.service.UserService;

import java.util.Map;

@RestController
class UserController {
    @Autowired
    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @CrossOrigin
    @PostMapping("/login")
    public ResponseEntity<Msg> login(@RequestBody Map<String, String> input) {
        Msg result = userService.check(input.get("username"), input.get("hashedPassword"));
        if (result.getStatus() >= 0) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
        }
    }

    @CrossOrigin
    @PostMapping("/register")
    public ResponseEntity<Msg> register(@RequestBody Map<String, String> input) {
        System.out.println(input);
        Msg result = userService.register(input);
        if (result.getStatus() >= 0) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
        }
    }
    @CrossOrigin
    @PostMapping("/changeUserStatus")
    public ResponseEntity<Msg> changeUserStatus(@RequestParam String username) {
        System.out.println(username);
        Msg result = userService.changeUserStatus(username);
        if (result.getStatus() >= 0) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
        }
    }
//    @CrossOrigin
//    @RequestMapping("/getUserList")
//    public ResponseEntity<Msg> getUserList() {
//        Msg result = userService.getUserList();
//        if (result.getStatus() >= 0) {
//            return ResponseEntity.ok(result);
//        } else {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
//        }
//    }
    @CrossOrigin
    @GetMapping("/getUserListByPage")
    public ResponseEntity<Msg> getUserListByPage(@RequestParam("page") Integer page,
                                                   @RequestParam("pageSize") Integer pageSize) {
        System.out.println("page: " + page + ", pageSize: " + pageSize);
        Msg result = userService.getUserListByPage(page,pageSize);
        System.out.println(result.getData());
        if (result.getStatus() >= 0) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
        }
    }

    @CrossOrigin
    @RequestMapping("/getRankingList")
    public ResponseEntity<Msg> getRankingList() {
        Msg result = userService.getRankingList();
        if (result.getStatus() >= 0) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
        }
    }

    @CrossOrigin
    @RequestMapping("/getTriedProblemList")
    public ResponseEntity<Msg> getTriedProblemList(@RequestParam String userId) {
        Msg result = userService.getTriedProblemList(Long.parseLong(userId));
        if (result.getStatus() >= 0) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
        }
    }

    @CrossOrigin
    @RequestMapping("/getSalt")
    public ResponseEntity<Msg> getSalt(@RequestParam String username) {
        Msg result = userService.getSalt(username);
        if (result.getStatus() >= 0) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
        }
    }

    @CrossOrigin
    @RequestMapping("/setSalt")
    public ResponseEntity<Msg> setSalt(@RequestParam String username, @RequestParam String salt) {
        Msg result = userService.setSalt(username, salt);
        if (result.getStatus() >= 0) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
        }
    }

    @CrossOrigin
    @RequestMapping("/getUsersByKeyword")
    public ResponseEntity<Msg> getUsersByKeyword(@RequestParam("keyword") String keyword, @RequestParam("page") Integer page, @RequestParam("pageSize") Integer pageSize) {
        Msg result = userService.getUsersByKeyword(keyword, page, pageSize);
        if (result.getStatus() >= 0) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
        }

    }

}