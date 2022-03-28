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

    @ManyToOne
    @JoinColumn(name = "user_seq")
    private User user;

    @OneToOne
    @JoinColumn(name = "post_seq")
    private Post post;

    @OneToOne(mappedBy = "nft")
    private Sale sale;

    private String nftAuthorName;
    private String nftTitle;
    private String nftDesc;
    private String nftOwnerAddress;
    private Long nftTokenId;
    private String nftCreatedAT;
    private String nftPictureLink;


}
