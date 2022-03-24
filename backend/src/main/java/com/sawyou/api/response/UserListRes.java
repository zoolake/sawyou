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
    @ApiModelProperty(name = "User Seq")
    private Long userSeq;
    @ApiModelProperty(name = "User ID")
    private String userId;
    @ApiModelProperty(name = "User Name")
    private String userName;
    @ApiModelProperty(name = "User Profile")
    private String userProfile;
}
