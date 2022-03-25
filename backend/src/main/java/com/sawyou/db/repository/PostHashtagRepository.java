package com.sawyou.db.repository;

import com.sawyou.db.entity.PostHashtag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * 게시글 해시태그 모델 관련 디비 쿼리 생성을 위한 JPA Query Method 인터페이스 정의.
 */
@Repository
public interface PostHashtagRepository extends JpaRepository<PostHashtag, Long> {
    // postSeq가 같은 데이터 전부 삭제
    @Transactional
    long deleteByPost_PostSeqEquals(Long postSeq);

    // hashtagSeq를 가지고 있는 데이터 count 세기
    int countPostHashtagByHashtag_HashtagSeq(Long hashtagSeq);

    // hashtagSeq로 데이터 전부 조회
    List<PostHashtag> findPostHashtagByHashtag_HashtagSeq(Long hashtagSeq);
}