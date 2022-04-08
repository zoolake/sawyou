package com.sawyou.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor @NoArgsConstructor
@ApiModel("NftInfoResponse")
public class NftInfoRes {
    @ApiModelProperty(name = "User 번호")
    private Long userSeq;
    @ApiModelProperty(name = "NFT 소유자 지갑 주소")
    private String nftOwnerAddress;
    @ApiModelProperty(name = "NFT 소유자 이름")
    private String nftOwnerName;
    @ApiModelProperty(name = "NFT 이미지 링크")
    private String nftPictureLink;
    @ApiModelProperty(name = "NFT 작가 이름")
    private String nftAuthorName;
    @ApiModelProperty(name = "NFT 제목")
    private String nftTitle;
    @ApiModelProperty(name = "NFT 설명")
    private String nftDesc;
    @ApiModelProperty(name = "NFT 토큰 아이디")
    private Long nftTokenId;
    @ApiModelProperty(name = "NFT 민팅 일자")
    private String nftCreateAt;

}
