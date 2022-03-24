package com.sawyou.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("UserListResponse")
public class UserListRes {
    @ApiModelProperty(name = "유저 번호")
    private Long userSeq;
    @ApiModelProperty(name = "유저 아이디")
    private String userId;
    @ApiModelProperty(name = "유저 이름/닉네임")
    private String userName;
    @ApiModelProperty(name = "유저 프로필 이미지 링크")
    private String userProfile;
}
