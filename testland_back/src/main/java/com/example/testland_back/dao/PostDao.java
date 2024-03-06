package com.example.testland_back.dao;

import com.example.testland_back.entity.Comment;
import com.example.testland_back.entity.Post;
import com.example.testland_back.util.Msg;

import java.util.List;
import java.util.Map;

public interface PostDao {
    List<Post> getPostByUser(String userName);
    Post addPost(Map<String, Object> post);
    Post getPostById(Long postId);
    Comment addComment(Map<String, Object> comment);
    List<Post> getPosts();

    List<Comment> findByParentIdOrderByCreatedAt(Long parentId);
}
