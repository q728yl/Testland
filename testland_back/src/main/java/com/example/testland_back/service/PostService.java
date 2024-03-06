package com.example.testland_back.service;

import com.example.testland_back.util.Msg;

import java.util.Map;

public interface PostService {
    Msg getPostByUser(String userName);
    Msg addPost(Map<String, Object> post);
    Msg addComment(Map<String, Object> comment);
    Msg getPostByPostId(String postId);
    Msg getPosts();
    Msg getPostsPreview();
}
