package com.sawyou.db.repository;

import com.sawyou.db.entity.Following;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * 팔로잉 모델 관련 디비 쿼리 생성을 위한 JPA Query Method 인터페이스 정의.
 */
@Repository
public interface FollowingRepository extends JpaRepository<Following, Long> {
}