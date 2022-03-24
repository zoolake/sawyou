package com.sawyou.db.repository;

import com.sawyou.db.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 게시글 모델 관련 디비 쿼리 생성을 위한 JPA Query Method 인터페이스 정의.
 */
@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    // userSeq와 같고 삭제 처리 되지 않은 데이터 조회
    List<Post> findByUser_UserSeqAndPostIsDeleteIsFalse(Long userSeq);
}