package com.sawyou.db.repository;

import com.sawyou.db.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 댓글 모델 관련 디비 쿼리 생성을 위한 JPA Query Method 인터페이스 정의.
 */
@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    // 해당 게시글 번호의 삭제되지 않은 댓글을 전부 조회
    List<Comment> findByPost_PostSeqIsAndCommentIsDeleteIsFalse(Long postSeq);
}