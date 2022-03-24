package com.sawyou.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.sawyou.db.entity.QCommentLike;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 * 댓글 좋아요 모델 관련 디비 쿼리 생성을 위한 구현 정의.
 */
@Repository
public class CommentLikeRepositorySupport {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    private QCommentLike qCommentLike = QCommentLike.commentLike;

    public Long deleteCommentLikeByUserSeq(Long userSeq) {
        Long affectedRow = jpaQueryFactory.delete(qCommentLike)
                .where(qCommentLike.user.userSeq.eq(userSeq)).execute();
        return affectedRow;
    }
}
