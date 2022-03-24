package com.sawyou.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@ApiModel("UserUpdateInfoRequest")
public class UserUpdateInfoReq {
    @ApiModelProperty(name = "유저 ID", example = "your_new_id")
    private String userId;
    @ApiModelProperty(name = "유저 이름/닉네임", example = "your_new_name")
    private String userName;
    @ApiModelProperty(name = "유저 이메일", example = "your_new_email")
    private String userEmail;
    @ApiModelProperty(name = "유저 자기소개", example = "your_new_desc")
    private String userDesc;
    @ApiModelProperty(name = "유저 프로필 사진", example = "your_new_profile")
    private String userProfile;
}
