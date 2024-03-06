package com.example.testland_back.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.example.testland_back.entity.Comment;

import java.util.ArrayList;
import java.util.List;



@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentDTO {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;
    private Long userId;
    private Long postId;
    private Long parentId;
    private String content;
    private Long likes;
    private String commentTime;

    private String avatar;

    private String username;

    private int height; //最高层为1
    private List<CommentDTO> replies = new ArrayList<>();
}