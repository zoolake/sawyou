package com.sawyou.api.request;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@Getter
public class NftPurchaseReq {

    @ApiModelProperty(name = "NFT 시퀀스", example = "your_nftseq")
    private Long nftSeq;
    @ApiModelProperty(name = "NFT 주인 주소", example = "owner_nft")
    private String nftOwnerAddress;

}