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
@ApiModel("NftListResponse")
public class NftListRes {
    @ApiModelProperty(name = "NFT 번호")
    private Long nftSeq;
    @ApiModelProperty(name = "NFT 이미지 링크")
    private String nftPictureLink;
}
