package com.example.testland_back.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "user_test")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserTest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_test_id")
    private Long userTestId;
    @Column(name = "user_problem_id")
    private Long userProblemId;
    @Column(name = "result")
//    (AC:0 WA:1 TLE:2 MLE:3 RE:4 CE:5 unsafe:6)
    private Integer result;
    @Column(name = "score", precision = 10, scale = 2)
    private Double score;
    private String address;//用户代码地址
    private String timeStamp;//开启测试时间
    private String language;
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_test_id")
    private List<UserTestcase> userTestcases;
}
