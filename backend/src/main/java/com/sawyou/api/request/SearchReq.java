package com.sawyou.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@Getter
@ApiModel("UserLoginPostRequest")
public class SearchReq {
    @ApiModelProperty(name = "검색 키워드", example = "keyword")
    private String keyword;
}
