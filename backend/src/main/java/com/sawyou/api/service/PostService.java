package com.sawyou.api.service;

import com.sawyou.db.entity.Post;

/**
 *	게시글, 댓글 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface PostService {
    // 게시글 조회
    Post getPostInfo(Long postSeq);
}
