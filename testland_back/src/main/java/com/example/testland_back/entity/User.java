package  com.example.testland_back.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "user")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;
    private String username;
    private String phone;
    private String address;
    private String email;
    private String avatar;
    private Integer passCount;
    private Integer tryCount;
    private String activeTime;
    // 0管理 1用户
    private Integer userType;
    // 0正常 1封禁
    private Integer userStatus;
    @OneToMany
    @JoinColumn(name = "user_id")
    private List<UserProblem> userproblems;
    @OneToMany
    @JoinColumn(name = "user_id")
    private List<Post> posts;
}