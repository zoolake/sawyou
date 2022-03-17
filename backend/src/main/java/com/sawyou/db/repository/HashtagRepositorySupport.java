package com.sawyou.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.sawyou.db.entity.QHashtag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 * 해시태그 좋아요 모델 관련 디비 쿼리 생성을 위한 구현 정의.
 */
@Repository
public class HashtagRepositorySupport {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    private QHashtag qHashtag = QHashtag.hashtag;
}
