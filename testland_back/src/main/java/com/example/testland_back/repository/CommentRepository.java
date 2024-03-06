package com.example.testland_back.repository;

import com.example.testland_back.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    Comment findCommentByPostId(Long postId);
    List<Comment> findByParentId(Long parentId);

    List<Comment> findByPostId(Long postId);
}
