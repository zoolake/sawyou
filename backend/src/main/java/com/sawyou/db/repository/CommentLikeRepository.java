package com.sawyou.db.repository;

import com.sawyou.db.entity.CommentLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

/**
 * 댓글 좋아요 모델 관련 디비 쿼리 생성을 위한 JPA Query Method 인터페이스 정의.
 */
@Repository
public interface CommentLikeRepository extends JpaRepository<CommentLike, Long> {
    // userSeq, commentSeq가 일치하는 데이터 찾기
    CommentLike findByUser_UserSeqAndComment_CommentSeq(Long userSeq, Long commentSeq);

    // commentSeq가 같은 데이터 전부 삭제
    @Transactional
    long deleteByComment_CommentSeqEquals(Long commentSeq);
}