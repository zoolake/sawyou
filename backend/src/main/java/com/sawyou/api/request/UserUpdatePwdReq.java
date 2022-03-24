package com.sawyou.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@ApiModel("UserUpdatePwdRequest")
public class UserUpdatePwdReq {
    @ApiModelProperty(name = "유저 비밀번호", example = "your_new_password")
    private String userPwd;
}
