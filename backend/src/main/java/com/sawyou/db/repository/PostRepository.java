package com.sawyou.db.repository;

import com.sawyou.db.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 게시글 모델 관련 디비 쿼리 생성을 위한 JPA Query Method 인터페이스 정의.
 */
@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    // 삭제 처리 되지 않은 게시글 작성시간 역순으로 정렬 후 조회
    Page<Post> findAllByPostIsDeleteFalseOrderByPostWritingTimeDesc(Pageable pageable);

    // userSeq와 같고 삭제 처리 되지 않은 데이터 조회
    List<Post> findByUser_UserSeqAndPostIsDeleteIsFalse(Long userSeq);
}