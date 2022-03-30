package com.sawyou.db.entity;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import org.hibernate.annotations.Generated;
import org.hibernate.annotations.GenerationTime;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NFT {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long nftSeq;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_seq")
    private User user;
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_seq")
    private Post post;

    /**
     * <수정>
     * sale과의 관게를 1:N 관계로 수정
     * 같은 NFT를 서로다른 사람이 팔 수 있기 때문이다.
     * written by 김정혁
     */
    @OneToMany(mappedBy = "nft")
    private List<Sale> sale;

    private String nftAuthorName;
    private String nftTitle;
    private String nftDesc;
    private String nftOwnerAddress;
    private Long nftTokenId;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    @Generated(GenerationTime.INSERT)
    @Column
    private LocalDateTime nftCreatedAt;

    private String nftPictureLink;
}
