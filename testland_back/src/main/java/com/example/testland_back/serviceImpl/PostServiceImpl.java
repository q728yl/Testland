package com.example.testland_back.serviceImpl;

import com.example.testland_back.dao.PostDao;
import com.example.testland_back.dao.ProblemDao;
import com.example.testland_back.dao.TestDao;
import com.example.testland_back.dao.UserDao;
import com.example.testland_back.entity.Comment;
import com.example.testland_back.entity.Post;
import com.example.testland_back.entity.Topic;
import com.example.testland_back.entity.User;
import com.example.testland_back.service.PostService;
import com.example.testland_back.util.ImageUtils;
import com.example.testland_back.util.Msg;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class PostServiceImpl implements PostService {
    @Autowired
    private PostDao postDao;
    @Autowired
    private UserDao userDao;

    @Autowired
    private ImageUtils imageUtils;

    public PostServiceImpl(PostDao postDao, UserDao userDao) {
        this.postDao = postDao;
        this.userDao = userDao;
    }

    @Override
    public Msg getPostByUser(String userName){
        List<Post> posts = postDao.getPostByUser(userName);
        if(posts.size() == 0)
            return new Msg(-1, "该用户没有发帖");
        return new Msg(1, " ", posts);
    }

    @Override
    public Msg addPost(Map<String, Object> post){
        User user = userDao.findUserByUsername((String)post.get("username"));
        if(user == null)
            return new Msg(-1, "该用户不存在");
        Post newPost = postDao.addPost(post);
        if(newPost == null)
            return new Msg(-1, "发表失败");
        return new Msg(1, "发表成功");
    }

    @Override
    public Msg addComment (Map<String, Object> comment){
//        User user = userDao.findUserByUid(((Integer)comment.get("userId")).longValue());
        String userIdStr = (String) comment.get("userId");
        Integer userId = Integer.parseInt(userIdStr);
        User user = userDao.findUserByUid(userId.longValue());

        if(user == null)
            return new Msg(-1, "该用户不存在");
        Comment newComment = postDao.addComment(comment);
        if(newComment == null)
            return new Msg(-1, "添加失败");
        return new Msg(1, "添加成功");
    }
    @Override
    public Msg getPostByPostId(String postId){
        Post post = postDao.getPostById(Long.parseLong(postId));
        if(post == null)
            return new Msg(-1, "该帖子不存在");
        return new Msg(1, " ", post);
    }

    @Override
    public Msg getPosts(){
        List<Post> posts = postDao.getPosts();
        for (Post post : posts) {
            post.setCoverUrl(imageUtils.getDownloadUrl(post.getCoverUrl()));
        }
        if(posts.size() == 0)
            return new Msg(-1, "没有帖子");
        return new Msg(1, " ", posts);
    }
    @Override
    public Msg getPostsPreview(){
        List<Post> posts = postDao.getPosts();
        if(posts.size() == 0)
            return new Msg(-1, "没有帖子");
        List<Map<String, Object>> result = new ArrayList<>();
        for(Post post: posts){
            Map<String, Object> map = new HashMap<>();
            map.put("postId", post.getPostId().toString());
            map.put("photo", post.getCoverUrl());
            map.put("postTime", post.getPostTime());
            map.put("browse", post.getBrowse().toString());
            map.put("likes", post.getLikes().toString());
            map.put("reply", post.getReply().toString());
            map.put("collect", post.getCollect().toString());
            List<Topic> topics = post.getTopics();
            List<String> topicContent = new ArrayList<>();
            for (Topic topic: topics){
                topicContent.add(topic.getContent());
            }
            map.put("topics", topicContent.toString());
            User user = userDao.findUserByUid(post.getUserId());
            map.put("userName", user.getUsername());
            map.put("userAvatar", user.getAvatar());
            result.add(map);
        }
        return new Msg(1, " ", result);
    }
}
