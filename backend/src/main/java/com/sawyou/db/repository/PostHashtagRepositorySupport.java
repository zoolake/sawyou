package com.sawyou.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.sawyou.db.entity.QPostHashtag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 * 게시글 해시태그 모델 관련 디비 쿼리 생성을 위한 구현 정의.
 */
@Repository
public class PostHashtagRepositorySupport {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    private QPostHashtag qPostHashtag = QPostHashtag.postHashtag;
}
