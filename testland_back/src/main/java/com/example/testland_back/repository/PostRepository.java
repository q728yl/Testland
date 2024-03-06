package com.example.testland_back.repository;

import com.example.testland_back.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findPostsByUserId(Long userId);
    Post findPostByPostId(Long postId);
    List<Post> findAll();
}
