package com.sawyou.db.repository;

import com.sawyou.db.entity.PostLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * 게시글 좋아요 모델 관련 디비 쿼리 생성을 위한 JPA Query Method 인터페이스 정의.
 */
@Repository
public interface PostLikeRepository extends JpaRepository<PostLike, Long> {
    // userSeq, postSeq가 일치하는 데이터 찾기
    PostLike findByUser_UserSeqAndPost_PostSeq(Long userSeq, Long postSeq);

    // postSeq가 같은 데이터 전부 삭제
    @Transactional
    long deleteByPost_PostSeqEquals(Long postSeq);
}
