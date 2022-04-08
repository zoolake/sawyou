package com.sawyou.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 유저 회원가입 API ([POST] /api/v1/users) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@ApiModel("UserRegisterPostRequest")
public class UserRegisterPostReq {
    @ApiModelProperty(name = "유저 아이디", example = "your_id")
    private String userId;
    @ApiModelProperty(name = "유저 비밀번호", example = "your_password")
    private String userPwd;
    @ApiModelProperty(name = "유저 이름/닉네임", example = "your_name")
    private String userName;
    @ApiModelProperty(name = "유저 이메일", example = "your_email")
    private String userEmail;
}
