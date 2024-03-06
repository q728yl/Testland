package com.example.testland_back.daoImpl;

import com.example.testland_back.dao.PostDao;
import com.example.testland_back.entity.Comment;
import com.example.testland_back.entity.Post;
import com.example.testland_back.entity.Topic;
import com.example.testland_back.entity.User;
import com.example.testland_back.repository.CommentRepository;
import com.example.testland_back.repository.PostRepository;
import com.example.testland_back.repository.TopicRepository;
import com.example.testland_back.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Repository
public class PostDaoImpl implements PostDao {
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private TopicRepository topicRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CommentRepository commentRepository;

    @Override
    public List<Post> getPostByUser(String userName){
        User user = userRepository.findUserByUsername(userName);
        return postRepository.findPostsByUserId(user.getUserId());
    }

    @Override
    public List<Comment> findByParentIdOrderByCreatedAt(Long parentId){
        return commentRepository.findByParentId(parentId);
    }
    @Override
    public Post addPost(Map<String, Object> post){
        User user = userRepository.findUserByUsername((String) post.get("username"));
        Post newPost = new Post();
        newPost.setUserId(user.getUserId());
        newPost.setBrowse(0L);
        newPost.setLikes(0L);
        newPost.setReply(0L);
        newPost.setCollect(0L);
        // 设置帖子的时间
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime now = LocalDateTime.now();
        String formattedTime = now.format(formatter);
        newPost.setPostTime(formattedTime);

        newPost.setText((String)post.get("text"));
        newPost.setCoverUrl((String)post.get("coverURL"));
        newPost.setTitle((String)post.get("title"));
        newPost.setSummary((String)post.get("summary"));
        // 设置帖子的话题
        List<Topic> topics = new ArrayList<>();
        List<String> topicNames = (List<String>)post.get("topics");
        if(topicNames != null){
            for(String topicName : topicNames){
                Topic topic = topicRepository.findTopicByContent(topicName);
                if(topic == null){
                    topic = new Topic();
                    topic.setContent(topicName);
                    topicRepository.save(topic);
                    if(topic.getPosts() == null)
                        topic.setPosts(new ArrayList<>());
                    topic.getPosts().add(newPost);
                    topics.add(topic);
                }
                else {
                    topic.getPosts().add(newPost);
                    topics.add(topic);
                }
            }
        }
        newPost.setTopics(topics);
        postRepository.save(newPost);
        return newPost;
    }

    @Override
    public Post getPostById(Long postId){
        return postRepository.findPostByPostId(postId);
    }

    @Override
    public Comment addComment(Map<String, Object> comment){
//        User user = userRepository.findUserByUsername((String)comment.get("username"));
        Post post = postRepository.findPostByPostId(Long.parseLong((String)comment.get("postId")));
        Comment newComment = new Comment();
//        newComment.setUserId(user.getUsername());
        if (((String)comment.get("userId"))!= null) newComment.setUserId(Long.parseLong((String)comment.get("userId")));
        newComment.setPostId(post.getPostId());
        newComment.setContent((String)comment.get("content"));
        newComment.setLikes(0L);

        Object parentIdObj = comment.get("parentId");
        if (parentIdObj != null) {
            newComment.setParentId(((Integer) parentIdObj).longValue());
        } else {
            newComment.setParentId(null);
        }

        // 设置评论的时间
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime now = LocalDateTime.now();
        String formattedTime = now.format(formatter);
        newComment.setCommentTime(formattedTime);
        commentRepository.save(newComment);

        post.getComments().add(newComment);
        post.setReply(post.getReply() + 1);
        if (post.getCommentNum() != null)post.setCommentNum(post.getCommentNum() + 1);
        postRepository.save(post);

//        System.out.println("success save comment");
//        System.out.println(newComment);

        return newComment;
    }

    @Override
    public List<Post> getPosts(){
        return postRepository.findAll();
    }

}
