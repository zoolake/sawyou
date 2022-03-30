package com.sawyou.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

@Getter
@ApiModel("NftSaleRequest")
public class NftSaleReq {

    @ApiModelProperty(name = "유저 시퀀스", example = "your_seq")
    private Long nftSeq;
    @ApiModelProperty(name = "판매 가격", example = "your_price")
    private Long salePrice;
    @ApiModelProperty(name = "판매 시작 시점", example = "your_startDate")
    private String saleStartDate;
    @ApiModelProperty(name = "판매 종료 시점", example = "your_endDate")
    private String saleEndDate;
    @ApiModelProperty(name = "sale컨트랙트 CA", example = "your_saleCA")
    private String saleContractAddress;



}
