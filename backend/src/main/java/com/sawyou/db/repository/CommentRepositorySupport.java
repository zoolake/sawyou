package com.sawyou.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.sawyou.db.entity.Comment;
import com.sawyou.db.entity.QComment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * 댓글 모델 관련 디비 쿼리 생성을 위한 구현 정의.
 */
@Repository
public class CommentRepositorySupport {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    private QComment qComment = QComment.comment;

    public List<Comment> findAllByUserSeq(Long userSeq) {
        List<Comment> comments = jpaQueryFactory.select(qComment).from(qComment)
                .where(qComment.user.userSeq.eq(userSeq)).fetch();
        return comments;
    }
}
