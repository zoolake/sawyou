package com.sawyou.db.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;

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

    @OneToOne(mappedBy = "nft")
    private Sale sale;

    @Column(name = "nft_author_name")
    private String nftAuthorName;
    @Column(name = "nft_title")
    private String nftTitle;
    @Column(name = "nft_desc")
    private String nftDesc;
    @Column(name = "nft_owner_address")
    private String nftOwnerAddress;
    @Column(name = "nft_token_id")
    private Long nftTokenId;
    @Column(name = "nft_created_at")
    private String nftCreatedAt;
    @Column(name = "nft_picture_link")
    private String nftPictureLink;


}
