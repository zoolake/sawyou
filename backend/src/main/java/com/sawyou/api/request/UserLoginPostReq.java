package com.sawyou.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 유저 로그인 API ([POST] /api/v1/auth/login) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@ApiModel("UserLoginPostRequest")
public class UserLoginPostReq {
    @ApiModelProperty(name = "유저 아이디", example = "your_id")
    private String userId;
    @ApiModelProperty(name = "유저 비밀번호", example = "your_password")
    private String userPwd;
}
