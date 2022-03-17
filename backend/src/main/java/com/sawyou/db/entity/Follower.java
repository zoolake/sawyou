package com.sawyou.db.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

/**
 * 팔로워 모델 정의.
 */
@Entity
@Getter
@Setter
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "followerSeq")
public class Follower {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long followerSeq = null;

    private Long followerFromSeq;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "follower_to_seq")
    private User user;
}
