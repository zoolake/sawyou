package com.sawyou.db.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.*;

import javax.persistence.*;

/**
 * 게시글 내 해시태그 모델 정의.
 */
@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "postHashtagSeq")
public class PostHashtag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postHashtagSeq;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "post_seq")
    private Post post;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "hashtag_seq")
    private Hashtag hashtag;
}
