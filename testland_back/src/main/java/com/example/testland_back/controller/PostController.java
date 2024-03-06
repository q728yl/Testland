package com.example.testland_back.controller;

import com.example.testland_back.entity.Comment;
import com.example.testland_back.entity.CommentDTO;
import com.example.testland_back.repository.UserRepository;
import com.example.testland_back.service.*;
import com.example.testland_back.util.Msg;
import com.qiniu.util.Auth;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.example.testland_back.service.QiNiuService;
import com.example.testland_back.repository.CommentRepository;
import com.example.testland_back.entity.User;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
public class PostController {
    @Autowired
    private PostService postService;

    @Autowired
    private UserRepository userRepository;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @CrossOrigin
    @PostMapping("/addPost")
    public ResponseEntity<Msg> addProblem(@RequestBody Map<String, Object> post) {
        Msg result = postService.addPost(post);
        if (result.getStatus() >= 0) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
        }
    }

    @CrossOrigin
    @GetMapping("/getPostByUser")
    public ResponseEntity<Msg> getPostByUser(@RequestParam String userName) {
        Msg result = postService.getPostByUser(userName);
        if (result.getStatus() >= 0) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
        }
    }

    @CrossOrigin
    @PostMapping("/addComment")
    public ResponseEntity<Msg> addComment(@RequestBody Map<String, Object> comment) {
        Msg result = postService.addComment(comment);
        if (result.getStatus() >= 0) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
        }
    }
    @CrossOrigin
    @RequestMapping("/getPostByPostId")
    public ResponseEntity<Msg> getPostByPostId(@RequestParam("postId") String postId) {
        System.out.println("once");
        Msg result = postService.getPostByPostId(postId);
        if (result.getStatus() >= 0) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
        }
    }

    @CrossOrigin
    @PostMapping("/getPosts")
    public ResponseEntity<Msg> getPosts() {
        Msg result = postService.getPosts();
        if (result.getStatus() >= 0) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
        }
    }
    @CrossOrigin
    @RequestMapping("/getPostsPreview")
    public ResponseEntity<Msg> getPostsPreview() {
        Msg result = postService.getPostsPreview();
        if (result.getStatus() >= 0) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
        }
    }


//    private static final String UPLOAD_DIR = "C:\\coding\\SBJ’s Summer\\frontend0712\\testland\\public\\post"; // 上传文件保存的目录

//    @CrossOrigin
//    @PostMapping("/uploadPostCover")
//    public String handleFileUpload(@RequestParam("file") MultipartFile file) {
//        if (file.isEmpty()) {
//            return "redirect:/?error=No file provided";
//        }
//
//        String originalFilename = StringUtils.cleanPath(file.getOriginalFilename());
//        try {
//            File dest = new File(UPLOAD_DIR + File.separator + originalFilename);
//            file.transferTo(dest);
//
//            // 执行其他逻辑，例如返回上传成功的信息
//            return "redirect:/?success=true&filePath=" + dest.getAbsolutePath();
//        } catch (IOException e) {
//            return "redirect:/?error=Failed to upload file";
//        }
//    }

    @Autowired
    private QiNiuService qiNiuService;
    @CrossOrigin
    @RequestMapping("/uploadImage")
    public Msg upLoadImage(@RequestPart("file") MultipartFile file) {
        System.out.println("upload-controller");
        return qiNiuService.uploadImageQiniu(file);
    }


    @CrossOrigin
    @RequestMapping("/downloadImage")
    public Msg downloadImage(@RequestParam("path") String path) {
        return qiNiuService.downloadImage(path);
    }


    @Autowired
    private CommentRepository commentRepository;

    @RequestMapping("/getCommentsByPostId")
    public List<CommentDTO> getCommentsForPost(@RequestParam Long postId) {
//        System.out.println("here");
//        System.out.println("postId");
//        System.out.println(postId);
        List<Comment> allComments = commentRepository.findByPostId(postId);
//        System.out.println(allComments);
        List<CommentDTO> treeComments = new ArrayList<>();

        // Find top-level comments (parentId is null)
        for (Comment comment : allComments) {
            if (comment.getParentId() == null) {
//                System.out.println("commmentId");
//                System.out.println(comment.getCommentId());
//                System.out.println("parentId");
//                System.out.println(comment.getParentId());
                CommentDTO commentDTO = new CommentDTO();
                commentDTO.setCommentId(comment.getCommentId());
                commentDTO.setPostId(postId);
                commentDTO.setCommentTime(comment.getCommentTime());
                commentDTO.setLikes(comment.getLikes());
                commentDTO.setContent(comment.getContent());
                commentDTO.setParentId(comment.getParentId());
                commentDTO.setUserId(comment.getUserId());
                commentDTO.setHeight(1);
                User user = userRepository.findUserByUserId(comment.getUserId());
                commentDTO.setAvatar(user.getAvatar());
                commentDTO.setUsername(user.getUsername());
                treeComments.add(commentDTO);
            }
        }

        // Build the tree structure
        buildTree(allComments, treeComments);

        return treeComments;
    }


    private void buildTree(List<Comment> allComments, List<CommentDTO> treeComments) {
        for (CommentDTO comment : treeComments) {
            List<CommentDTO> childComments = new ArrayList<>();
            for (Comment c : allComments) {
                if (c.getParentId() != null && c.getParentId().equals(comment.getCommentId())) {
//                    System.out.println("commmentId");
//                    System.out.println(comment.getCommentId());
//                    System.out.println("parentId");
//                    System.out.println(comment.getParentId());
                    CommentDTO commentDTO = new CommentDTO();
                    commentDTO.setCommentId(c.getCommentId());
                    commentDTO.setPostId(c.getPostId());
                    commentDTO.setCommentTime(c.getCommentTime());
                    commentDTO.setLikes(c.getLikes());
                    commentDTO.setContent(c.getContent());
                    commentDTO.setParentId(c.getParentId());
                    commentDTO.setUserId(c.getUserId());
                    commentDTO.setHeight(comment.getHeight()+1);
                    User user = userRepository.findUserByUserId(comment.getUserId());
                    commentDTO.setAvatar(user.getAvatar());
                    commentDTO.setUsername(user.getUsername());
                    childComments.add(commentDTO);
                }
            }
            comment.setReplies(childComments);
            if (!childComments.isEmpty()) buildTree(allComments, childComments);
        }
    }

}
