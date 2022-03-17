package com.sawyou.db.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

/**
 * 유저 모델 정의.
 */
@Entity
@Getter
@Setter
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "userSeq")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userSeq = null;

    private String userId;

    @JsonIgnore
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String userPwd;

    private String userName;
    private String userEmail;
    private String userDesc;
    private String userProfile;
    private boolean userIsDelete;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<Comment> comments;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<CommentLike> commentLikes;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<Follower> followers;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<Following> followings;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<Post> posts;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<PostLike> postLikes;
}
