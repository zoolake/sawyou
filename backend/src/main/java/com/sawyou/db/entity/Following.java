package com.sawyou.db.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

/**
 * 팔로잉 모델 정의.
 */
@Entity
@Getter
@Setter
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "followingSeq")
public class Following {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long followingSeq = null;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "following_from_seq")
    private User user;

    private Long followingToSeq;
}
