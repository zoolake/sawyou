package com.sawyou.api.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor @AllArgsConstructor
public class UserUpdateInfoReq {
    private String userId;
    private String userName;
    private String userEmail;
    private String userDesc;
    private String userProfile;
}
