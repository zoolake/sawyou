package com.sawyou.api.service;

import com.sawyou.api.response.PostRes;
import com.sawyou.db.entity.Post;

import java.util.List;

/**
 *	게시글 리스트, 검색 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface ListService {

    List<PostRes> getPostListAll();

    List<PostRes> getPostListFollowing(Long userSeq);
}
