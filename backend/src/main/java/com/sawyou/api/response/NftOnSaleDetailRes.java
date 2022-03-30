package com.sawyou.api.response;

import com.sawyou.db.entity.Sale;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("NftOnSaleResponse")
public class NftOnSaleDetailRes {
    @ApiModelProperty(name="유저 seq")
    private Long userSeq;
    @ApiModelProperty(name="nft 소유자주소")
    private String nftOwnerAddress;
    @ApiModelProperty(name="판매자 이름")
    private String sellerName;
    @ApiModelProperty(name="판매자 아이디")
    private String sellerId;
    @ApiModelProperty(name="판매자 프로필 이미지 링크")
    private String sellerProfile;
    @ApiModelProperty(name="판매 가격")
    private Long salePrice;
    @ApiModelProperty(name="판매 시작 시간")
    private String startDate;
    @ApiModelProperty(name="판매 종료 시간")
    private String endDate;
    @ApiModelProperty(name="nft 이미지 링크")
    private String nftPictureLink;
    @ApiModelProperty(name="nft 작가 이름")
    private String nftAuthorName;
    @ApiModelProperty(name="nft 제목")
    private String nftTitle;
    @ApiModelProperty(name="nft 설명")
    private String nftDesc;
    @ApiModelProperty(name="nft 토큰 id")
    private Long nftTokenId;
    @ApiModelProperty(name="nft 생성시점")
    private String nftCreatedAt;

    public NftOnSaleDetailRes(Sale sale){
        this.userSeq = sale.getNft().getUser().getUserSeq();
        this.nftOwnerAddress = sale.getNft().getNftOwnerAddress();
        this.sellerName = sale.getNft().getUser().getUserName();
        this.sellerId = sale.getNft().getUser().getUserId();
        this.sellerProfile = sale.getNft().getUser().getUserProfile();
        this.salePrice = sale.getSalePrice();
        this.startDate = sale.getSaleStartDate();
        this.endDate = sale.getSaleEndDate();
        this.nftPictureLink = sale.getNft().getNftPictureLink();
        this.nftAuthorName = sale.getNft().getNftAuthorName();
        this.nftTitle = sale.getNft().getNftTitle();
        this.nftDesc = sale.getNft().getNftDesc();
        this.nftTokenId = sale.getNft().getNftTokenId();
        this.nftCreatedAt = sale.getNft().getNftCreatedAt().toString();
    }



}
