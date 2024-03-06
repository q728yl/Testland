package com.example.testland_back.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.w3c.dom.Text;

import java.util.List;
import jakarta.persistence.*;


@Entity
@Table(name = "problem")
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString(exclude = {"examples", "tags"})
public class Problem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "problem_id")
    private Long problemId;
    @Column(name = "problem_title")
    private String problemTitle;
    @Column(name = "difficulty")
    private Integer difficulty;
    private Integer testCount;
    private String description;
    private String hint;
    private String testPath;
    private Integer waCount;
    private Integer acCount;
    private Integer tleCount;
    private Integer reCount;
    private Integer mleCount;
    private String updateTime;
    @Column(name = "category_id")
    private Long categoryId;
    @ManyToMany
    @JoinTable(
            name = "problem_tag",
            joinColumns = @JoinColumn(name = "problem_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    private List<Tag> tags;
    @OneToMany
    @JoinColumn(name = "problem_id")
    private List<Example> examples;


}

