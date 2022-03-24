package com.sawyou.db.repository;

import com.sawyou.db.entity.Following;
import com.sawyou.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 팔로잉 모델 관련 디비 쿼리 생성을 위한 JPA Query Method 인터페이스 정의.
 */
@Repository
public interface FollowingRepository extends JpaRepository<Following, Long> {
    void deleteByFollowingToSeq(Long toSeq);

    // userSeq와 같은 데이터 조회
    List<Following> findByUser_UserSeq(Long userSeq);
}