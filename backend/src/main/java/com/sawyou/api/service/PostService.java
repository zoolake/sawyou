package com.sawyou.api.service;

import com.sawyou.db.entity.Post;
import com.sawyou.api.response.PostRes;

/**
 *	게시글, 댓글 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface PostService {
    // 게시글 Seq 값으로 찾기
    Post getPostByPostSeq(Long postSeq);

    // 게시글 작성
    Post writePost(String postContent, Long userSeq);

    // 게시글 조회
    PostRes getPostInfo(Long postSeq);

    // 게시글 수정
    Post updatePost(Post post, String postContent);
}
