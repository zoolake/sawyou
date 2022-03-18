package com.sawyou.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.sawyou.db.entity.QPostLike;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 * 게시글 좋아요 모델 관련 디비 쿼리 생성을 위한 구현 정의.
 */
@Repository
public class PostLikeRepositorySupport {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    private QPostLike qPostLike = QPostLike.postLike;
}
