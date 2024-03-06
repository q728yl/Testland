package com.example.testland_back.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "user_testcase")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserTestcase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_testcase_id")
    private Long userTestcaseId;
    @Column(name = "user_test_id")
    private Long userTestId;
//    (AC:0 WA:1 TLE:2 MLE:3 RE:4 CE:5 unsafe:6)
    private Integer result;
//    private String description;
    private String time;
    private String memory;
    @Column(name = "score", precision = 10, scale = 2)
    private Double score;
}
