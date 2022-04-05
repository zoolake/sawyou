package com.sawyou.api.request;

import com.sawyou.db.entity.NFT;
import com.sawyou.db.entity.Post;
import com.sawyou.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@Getter
@ApiModel("NftMintRequest")
public class NftMintReq {

    @ApiModelProperty(name = "게시물 시퀀스", example = "post_seq")
    private Long postSeq;
    @ApiModelProperty(name = "NFT 작가 이름", example = "nft_author_name")
    private String nftAuthorName;
    @ApiModelProperty(name = "NFT 제목", example = "nft_title")
    private String nftTitle;
    @ApiModelProperty(name = "NFT 설명", example = "nft_desc")
    private String nftDesc;
    @ApiModelProperty(name = "NFT 이미지 링크", example = "nft_picture_link")
    private String nftPictureLink;
    @ApiModelProperty(name = "NFT 토큰 아이디", example = "nft_token_id")
    private Long nftTokenId;
    @ApiModelProperty(name = "NFT 소유자 지갑 주소", example = "nft_owner_address")
    private String nftOwnerAddress;

    public NFT toEntity(User user, Post post) {
        return NFT.builder()
                .user(user)
                .post(post)
                .nftAuthorName(nftAuthorName)
                .nftTitle(nftTitle)
                .nftDesc(nftDesc)
                .nftOwnerAddress(nftOwnerAddress)
                .nftTokenId(nftTokenId)
                .nftPictureLink(nftPictureLink)
                .nftForSale(false)
                .build();
    }
}
