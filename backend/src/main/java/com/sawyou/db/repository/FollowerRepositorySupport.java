package com.sawyou.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.sawyou.db.entity.Follower;
import com.sawyou.db.entity.Following;
import com.sawyou.db.entity.QFollower;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * 팔로워 모델 관련 디비 쿼리 생성을 위한 구현 정의.
 */
@Repository
public class FollowerRepositorySupport {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    private QFollower qFollower = QFollower.follower;

    public Optional<Follower> findFollowerByUserSeq(Long userSeq, Long toSeq) {
        // userSeq(fromSeq) : 팔로잉 대상 seq / toSeq : 본인 Seq
        Follower follower = jpaQueryFactory.select(qFollower).from(qFollower)
                .where(qFollower.followerFromSeq.eq(userSeq).and(qFollower.user.userSeq.eq(toSeq))).fetchOne();
        if (follower == null) return Optional.empty();
        return Optional.ofNullable(follower);
    }
}
