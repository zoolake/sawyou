package com.sawyou.api.response;

import com.sawyou.db.entity.User;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 회원 본인 정보 조회 API ([GET] /api/v1/users/me) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
@ApiModel("UserResponse")
public class UserRes {
    @ApiModelProperty(name = "User ID")
    private String userId;
    @ApiModelProperty(name = "User Name")
    private String userName;
    @ApiModelProperty(name = "User Email")
    private String userEmail;
    @ApiModelProperty(name = "User Desc")
    private String userDesc;
    @ApiModelProperty(name = "User Profile")
    private String userProfile;


    public UserRes(User user) {
        this.userId = user.getUserId();
        this.userName = user.getUserName();
        this.userEmail = user.getUserEmail();
        this.userDesc = user.getUserDesc();
        this.userProfile = user.getUserProfile();
    }
}
