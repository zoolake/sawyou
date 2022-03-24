package com.sawyou.api.service;

import com.sawyou.api.request.UserRegisterPostReq;
import com.sawyou.api.request.UserUpdateInfoReq;
import com.sawyou.api.request.UserUpdatePwdReq;
import com.sawyou.api.response.UserListRes;
import com.sawyou.api.response.UserRes;
import com.sawyou.db.entity.User;

import java.util.List;

/**
 * 유저 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface UserService {
    User createUser(UserRegisterPostReq userRegisterInfo);

    User getUserByUserId(String userId);

    UserRes getUser(Long UserSeq, Long fromSeq);

    User updateUserInfo(UserUpdateInfoReq updateInfo, Long userSeq);
    User updateUserPwd(UserUpdatePwdReq updatePwd, Long userSeq);

    boolean followingUser(User user, Long followingToSeq);

    List<UserListRes> findUserFollowing(Long userSeq);
    List<UserListRes> findUserFollower(Long userSeq);

    User deleteUser(User user);
}
