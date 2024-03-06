package com.example.testland_back.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "post")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id")
    private Long postId;
    @Column(name = "user_id")
    private Long userId;
    private String text;

    @Column(name = "cover_url")
    private String coverUrl;
    private String postTime;

    private String title;

    private String summary;
    private Long browse;
    private Long likes;
    private Long reply;
    private Long collect;
    @ManyToMany
    @JoinTable(name = "post_topic", joinColumns = @JoinColumn(name = "post_id"), inverseJoinColumns = @JoinColumn(name = "topic_id"))
    private List<Topic> topics;
    @OneToMany
    @JoinColumn(name = "post_id")
    private List<Comment> comments;

    @Column(name = "comment_num")
    private Long commentNum;

}

