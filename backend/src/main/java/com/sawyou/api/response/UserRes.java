package com.sawyou.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

/**
 * 회원 본인 정보 조회 API ([GET] /api/v1/users/me) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("UserResponse")
public class UserRes {
    @ApiModelProperty(name = "유저 번호")
    private Long userSeq;
    @ApiModelProperty(name = "유저 아이디")
    private String userId;
    @ApiModelProperty(name = "유저 이름/닉네임")
    private String userName;
    @ApiModelProperty(name = "유저 이메일")
    private String userEmail;
    @ApiModelProperty(name = "유저 소개")
    private String userDesc;
    @ApiModelProperty(name = "유저 프로필 이미지 링크")
    private String userProfile;
    @ApiModelProperty(name = "작성 게시글 수")
    private int postCnt;
    @ApiModelProperty(name = "유저 팔로잉 수")
    private int followingCnt;
    @ApiModelProperty(name = "유저 팔로워 수")
    private int followerCnt;
    @ApiModelProperty(name = "팔로잉 여부")
    private boolean isFollowing;
}
