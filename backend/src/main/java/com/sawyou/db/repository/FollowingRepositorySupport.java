package com.sawyou.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.sawyou.db.entity.Following;
import com.sawyou.db.entity.QFollowing;
import com.sawyou.db.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * 팔로잉 모델 관련 디비 쿼리 생성을 위한 구현 정의.
 */
@Repository
public class FollowingRepositorySupport {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    private QFollowing qFollowing = QFollowing.following;

    public Optional<Following> findFollowingByUserSeq(Long userSeq, Long fromSeq) {
        Following following = jpaQueryFactory.select(qFollowing).from(qFollowing)
                .where(qFollowing.followingToSeq.eq(userSeq).and(qFollowing.user.userSeq.eq(fromSeq))).fetchOne();
        if (following == null) return Optional.empty();
        return Optional.ofNullable(following);
    }
}
