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
    // 회원가입
    User createUser(UserRegisterPostReq userRegisterInfo);

    // 유저 id로 유저 조회
    User getUserByUserId(String userId);

    // 유저 seq로 유저 조회 (찾을 유저의 userSeq, 나의 userSeq) - 나와 상대방 사이의 관계 파악
    UserRes getUser(Long UserSeq, Long fromSeq);

    // 유저 정보 수정
    User updateUserInfo(UserUpdateInfoReq updateInfo, Long userSeq);

    // 유저 비밀번호 수정
    User updateUserPwd(UserUpdatePwdReq updatePwd, Long userSeq);

    // 유저 팔로잉/취소
    boolean followingUser(User user, Long followingToSeq);

    // 유저의 팔로잉 리스트 조회
    List<UserListRes> getUserFollowingList(Long userSeq);
    // 유저의 팔로워 리스트 조회
    List<UserListRes> getUserFollowerList(Long userSeq);

    // 회원 탈퇴
    User deleteUser(User user);
}
