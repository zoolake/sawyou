package com.sawyou.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
@Getter
@ApiModel("CancelSaleRequest")
public class CancelSaleReq {

    @ApiModelProperty(name = "삭제 CA", example = "삭제 CA")
    private String saleContractAddress;
}
