package com.sawyou.api.response;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class UserListRes {
    @ApiModelProperty(name = "User ID")
    private String userId;
    @ApiModelProperty(name = "User Name")
    private String userName;
    @ApiModelProperty(name = "User Profile")
    private String userProfile;
}
