package com.sawyou.api.response;

import com.sawyou.db.entity.User;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

/**
 * 회원 본인 정보 조회 API ([GET] /api/v1/users/me) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
@Builder
@NoArgsConstructor @AllArgsConstructor
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

    @ApiModelProperty(name = "User Following Count")
    private int followingCnt;

    @ApiModelProperty(name = "User Follower Count")
    private int followerCnt;

    @ApiModelProperty(name = "팔로잉 여부")
    private boolean isFollowing;
}
