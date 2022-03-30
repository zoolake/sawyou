package com.sawyou.api.response;

import com.sawyou.db.entity.Sale;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("NftOnSaleResponse")
public class NftOnSaleRes {

    @ApiModelProperty(name="nft 번호")
    private Long nftSeq;
    @ApiModelProperty(name="판매자 이름")
    private String sellerName;
    @ApiModelProperty(name="판매자 아이디")
    private String sellerId;
    @ApiModelProperty(name="판매자 프로필 이미지 링크 ")
    private String sellerProfile;
    @ApiModelProperty(name="판매 가격")
    private  Long salePrice;
    @ApiModelProperty(name="판매 시작 시간")
    private String salestartDate;
    @ApiModelProperty(name="판매 종료 시간")
    private String saleEndDate;
    @ApiModelProperty(name="nft 이미지 링크")
    private  String nftPictureLink;

    public NftOnSaleRes(Sale sale){
        this.nftSeq = sale.getNft().getNftSeq();
        this.sellerName = sale.getNft().getUser().getUserName();
        this.sellerId = sale.getNft().getUser().getUserId();
        this.sellerProfile = sale.getNft().getUser().getUserProfile();
        this.salePrice = sale.getSalePrice();
        this.salestartDate = sale.getSaleStartDate().toString();
        this.saleEndDate = sale.getSaleEndDate().toString();
        this.nftPictureLink = sale.getNft().getNftPictureLink();

    }

}
