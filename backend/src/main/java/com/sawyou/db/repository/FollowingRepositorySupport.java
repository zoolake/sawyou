package com.sawyou.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.sawyou.db.entity.QFollowing;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 * 팔로잉 모델 관련 디비 쿼리 생성을 위한 구현 정의.
 */
@Repository
public class FollowingRepositorySupport {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    private QFollowing qFollowing = QFollowing.following;
}
