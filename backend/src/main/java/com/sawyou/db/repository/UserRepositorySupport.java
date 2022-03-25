package com.sawyou.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.sawyou.db.entity.QUser;
import com.sawyou.db.entity.User;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 * 유저 모델 관련 디비 쿼리 생성을 위한 구현 정의.
 */
@Repository
public class UserRepositorySupport {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    private QUser qUser = QUser.user;

    // userId와 같은 데이터 조회
    public Optional<User> findUserByUserId(String userId) {
        User user = jpaQueryFactory.select(qUser).from(qUser)
                .where(qUser.userId.eq(userId)).fetchOne();
        if (user == null) return Optional.empty();
        return Optional.ofNullable(user);
    }

    // userSeq와 같은 데이터 조회
    public Optional<User> findUserByUserSeq(Long userSeq) {
        User user = jpaQueryFactory.select(qUser).from(qUser)
                .where(qUser.userSeq.eq(userSeq)).fetchOne();
        if (user == null) return Optional.empty();
        return Optional.ofNullable(user);
    }

    // keyword를 포함하는 아이디/이름을 갖는 데이터 조회
    public List<User> findUserByKeyword(String keyword) {
        List<User> userList = jpaQueryFactory.select(qUser).from(qUser)
                .where(qUser.userId.startsWith(keyword).or(qUser.userName.startsWith(keyword))).fetch();
        return userList;
    }
}
