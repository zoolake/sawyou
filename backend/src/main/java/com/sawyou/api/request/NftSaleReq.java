package com.sawyou.api.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;
import org.hibernate.annotations.Generated;
import org.hibernate.annotations.GenerationTime;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.Column;
import java.time.LocalDateTime;

@Getter
@Setter
@ApiModel("NftSaleRequest")
public class NftSaleReq {

    @ApiModelProperty(name = "유저 시퀀스", example = "your_seq")
    private Long nftSeq;
    @ApiModelProperty(name = "판매 가격", example = "your_price")
    private Long salePrice;
//    @ApiModelProperty(name = "판매 시작 시점", example = "your_startDate")
//    private LocalDateTime saleStartDate;
//    @ApiModelProperty(name = "판매 종료 시점", example = "your_endDate")
//    private LocalDateTime saleEndDate;
    @ApiModelProperty(name = "sale컨트랙트 CA", example = "your_saleCA")
    private String saleContractAddress;



}
