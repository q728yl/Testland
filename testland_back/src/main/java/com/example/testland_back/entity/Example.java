package  com.example.testland_back.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


/*
 *  对应数据库中的"user"表
 *  problem、post映射未完成
 */

@Entity
@Table(name = "example")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Example {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "example_id")
    private Long exampleId;
    @Column(name = "problem_id")
    private Long problemId;
    private String input;
    private String output;
    private String explanation;

}