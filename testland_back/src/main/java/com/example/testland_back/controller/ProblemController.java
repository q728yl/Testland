package com.example.testland_back.controller;


import com.example.testland_back.entity.Problem;
import com.example.testland_back.service.ProblemService;
import com.example.testland_back.util.Msg;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.File;
import java.io.IOException;
import java.util.*;

@RestController
public class ProblemController {
    @Autowired
    private ProblemService problemService;

    public ProblemController(ProblemService problemService) {
        this.problemService = problemService;
    }

    @CrossOrigin
    @GetMapping("/getAllProblemByPage")
    public ResponseEntity<Msg> getAllProblemByPage(@RequestParam("page") Integer page,
                                                   @RequestParam("pageSize") Integer pageSize) {
        Msg result = problemService.getAllProblemByPage(page, pageSize);
        if (result.getStatus() >= 0) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
        }

    }

    @CrossOrigin
    @RequestMapping("/getProblemById")
    public ResponseEntity<Msg> getProblemById(@RequestParam String problemId) {
        Msg result = problemService.getProblemById(Long.parseLong(problemId));
        if (result.getStatus() >= 0) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
        }
    }

    @CrossOrigin
    @RequestMapping("getCategoryContentById")
    public ResponseEntity<Msg> getCategoryById(@RequestParam String categoryId) {
        Msg result = problemService.getCategoryById(Long.valueOf(categoryId));
        if (result.getStatus() >= 0) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
        }
    }

    @CrossOrigin
    @RequestMapping("/getProblemByTag")
    public ResponseEntity<Msg> getProblemByTag(@RequestParam String tag) {
        Msg result = problemService.getProblemByTag(tag);
        if (result.getStatus() >= 0) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
        }
    }

    @CrossOrigin
    @RequestMapping("/getProblemByTagAndPage")
    public ResponseEntity<Msg> getProblemByTagAndPage(@RequestParam String tag, @RequestParam("page") Integer page, @RequestParam("pageSize") Integer pageSize) {
        Msg result = problemService.getProblemByTagAndPage(tag, page, pageSize);
        if (result.getStatus() >= 0) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
        }
    }

    @CrossOrigin
    @RequestMapping("/getProblemByCategory")
    public ResponseEntity<Msg> getProblemByCategory(@RequestParam String category) {
        Msg result = problemService.getProblemByCategory(category);
        if (result.getStatus() >= 0) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
        }
    }

    @CrossOrigin
    @RequestMapping("/getProblemByCategoryAndPage")
    public ResponseEntity<Msg> getProblemByCategoryAndPage(@RequestParam String category, @RequestParam("page") Integer page, @RequestParam("pageSize") Integer pageSize) {
        Msg result = problemService.getProblemByCategoryAndPage(category, page, pageSize);
        if (result.getStatus() >= 0) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
        }
    }

    @CrossOrigin
    @PostMapping("/addProblem")
    public ResponseEntity<Msg> addProblem(@RequestBody Map<String, Object> problem) {
        Msg result = problemService.addProblem(problem);
        if (result.getStatus() >= 0) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
        }
    }

    @CrossOrigin
    @PostMapping("/addProblemByFile")
    public ResponseEntity<Msg> addProblemByFile(String problem, @RequestParam("testCasesFile") MultipartFile file) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> problemMap = objectMapper.readValue(problem, new TypeReference<Map<String, Object>>() {
        });
        problemService.addProblemByFile(problemMap, file);

        return ResponseEntity.ok(new Msg(1, "Add problem success", problem));

    }

    @CrossOrigin
    @PostMapping("/addExample")
    public ResponseEntity<Msg> addExample(@RequestBody Map<String, Object> example) {
        Msg result = problemService.addExample(example);
        if (result.getStatus() >= 0) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
        }
    }

    @CrossOrigin
    @RequestMapping("/getCategory")
    public Msg getCategory() {
        return problemService.getCategory();

    }

    @CrossOrigin
    @PostMapping("/deleteProblem")
    public ResponseEntity<Msg> deleteProblem(@RequestParam String problemId) {
        Msg result = problemService.deleteProblem(Long.parseLong(problemId));
        if (result.getStatus() >= 0) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
        }

    }

    @CrossOrigin
    @RequestMapping("/getProblemStatistics")
    public ResponseEntity<Msg> getProblemStatistics(@RequestParam("problemId") String problemId) {
        Msg result = problemService.getProblemStatistics(Long.parseLong(problemId));
        if (result.getStatus() >= 0) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
        }
    }


    @CrossOrigin
    @RequestMapping("/filtrateProblem")
    public ResponseEntity<Msg> filtrateProblem(@RequestParam String keyword) {
        Msg result = problemService.filtrateProblem(keyword);
        if (result.getStatus() >= 0) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
        }
    }

    @CrossOrigin
    @RequestMapping("/filtrateProblemByPage")
    public ResponseEntity<Msg> filtrateProblemByPage(@RequestParam String keyword, @RequestParam("page") Integer page, @RequestParam("pageSize") Integer pageSize) {
        Msg result = problemService.filtrateProblemByPage(keyword, page, pageSize);
        if (result.getStatus() >= 0) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
        }
    }

    @CrossOrigin
    @RequestMapping("/updateProblem")
    public ResponseEntity<Msg> updateProblem(@RequestBody Map<String, Object> problem) {
        // System.out.println(problem);
        Msg result = problemService.updateProblem(problem);
        if (result.getStatus() >= 0) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
        }
    }
    @CrossOrigin
    @RequestMapping("/updateTestcases")
    public ResponseEntity<Msg> updateTestcases(@RequestParam("problemId") Long problemId, @RequestParam("testcases") MultipartFile testcases) {
        System.out.println(problemId);
        System.out.println(testcases.getOriginalFilename());
        Msg result = problemService.updateTestcases(testcases,problemId);
        if (result.getStatus() >= 0) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
        }
    }

    @CrossOrigin
    @RequestMapping("/updateExample")
    public ResponseEntity<Msg> updateExample(@RequestBody Map<String, Object> example) {
        Msg result = problemService.updateExample(example);
        if (result.getStatus() >= 0) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
        }
    }

    @CrossOrigin
    @RequestMapping("/deleteExample")
    public ResponseEntity<Msg> deleteExample(@RequestParam String exampleId) {
        Msg result = problemService.deleteExample(Long.parseLong(exampleId));
        if (result.getStatus() >= 0) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);

        }
    }

    @CrossOrigin
    @RequestMapping("/getAllCategoryName")
    public ResponseEntity<Msg> getAllCategoryName() {
        Msg result = problemService.getAllCategoryName();
        if (result.getStatus() >= 0) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
        }
    }

    @CrossOrigin
    @RequestMapping("/getAllTag")
    public ResponseEntity<Msg> getAllTag() {
        Msg result = problemService.getAllTag();
        if (result.getStatus() >= 0) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);

        }
    }

    @CrossOrigin
    @RequestMapping("/selectProblemByPageAndOthers")
    public ResponseEntity<Msg> selectProblemByPageAndOthers(@RequestBody Map<String, Object> map) {
        Msg result = problemService.selectProblem(map);
        if (result.getStatus() >= 0) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);

        }
    }

}

