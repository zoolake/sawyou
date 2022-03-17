package com.sawyou.db.repository;

import com.sawyou.db.entity.PostLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * 게시글 좋아요 모델 관련 디비 쿼리 생성을 위한 JPA Query Method 인터페이스 정의.
 */
@Repository
public interface PostLikeRepository extends JpaRepository<PostLike, Long> {
}