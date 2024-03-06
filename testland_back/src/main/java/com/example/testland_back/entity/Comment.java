package com.example.testland_back.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "comment")
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private Long commentId;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "post_id")
    private Long postId;


    @JoinColumn(name = "parent_id")
    private Long parentId; // 父级评论

//    @OneToMany(mappedBy = "parentId", cascade = CascadeType.ALL)
//    private List<Comment> childComments; // 子级评论

    private String content;
    private Long likes;
    private String commentTime;

    // 构造函数、getter 和 setter 方法
}

