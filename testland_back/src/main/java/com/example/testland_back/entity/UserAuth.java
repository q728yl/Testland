package com.example.testland_back.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name ="user_auth")
public class UserAuth {
    @Id
    @Column(name = "user_id")
    private Long userId;
    private String password;
    private String salt;

}
