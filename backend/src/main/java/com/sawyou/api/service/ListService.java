package com.sawyou.api.service;

import com.sawyou.api.response.HashtagRes;
import com.sawyou.api.response.PostRes;
import com.sawyou.api.response.UserListRes;

import java.util.List;

/**
 *	게시글 리스트, 검색 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface ListService {

    // 모든 게시글 조회
    List<PostRes> getPostListAll();

    // 팔로잉 게시글 조회
    List<PostRes> getPostListFollowing(Long userSeq);

    // 유저 게시글 조회
    List<PostRes> getPostListUser(Long userSeq);

    // 계정 검색
    List<UserListRes> searchUserList(String keyword);

    // 해시태그 검색
    List<HashtagRes> searchHashtagList(String keyword);
}
