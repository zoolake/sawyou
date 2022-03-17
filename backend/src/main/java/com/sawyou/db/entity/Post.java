package com.sawyou.db.entity;

import com.fasterxml.jackson.annotation.*;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

/**
 * 게시글 모델 정의.
 */
@Entity
@Getter
@Setter
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "postSeq")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postSeq = null;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "user_seq")
    private User user;

    private String postContent;
    private String postPictureLink;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime postWritingTime;

    private boolean postIsDelete;
    private boolean postIsNft;

    @JsonIgnore
    @OneToMany(mappedBy = "post")
    private List<Comment> comments;

    @JsonIgnore
    @OneToMany(mappedBy = "post")
    private List<PostHashtag> postHashtags;

    @JsonIgnore
    @OneToMany(mappedBy = "post")
    private List<PostLike> postLikes;
}
