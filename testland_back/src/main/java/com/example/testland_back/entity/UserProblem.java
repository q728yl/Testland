package com.example.testland_back.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "user_problem")
public class UserProblem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_problem_id")
    private Long userProblemId;
    @Column(name = "user_id")
    private Long userId;
    @Column(name = "problem_id")
    private Long problemId;
    private Integer testCount;
//    0:未通过 1:通过
    private Integer problemStatus;
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_problem_id")
    private List<UserTest> userTests;
}
