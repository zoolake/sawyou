package com.sawyou.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.sawyou.db.entity.Post;
import com.sawyou.db.entity.QComment;
import com.sawyou.db.entity.QPost;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 게시글 모델 관련 디비 쿼리 생성을 위한 구현 정의.
 */
@Repository
public class PostRepositorySupport {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    private QPost qPost = QPost.post;

    // userSeq와 같고 NFT화 되지 않은 데이터 조회
    public List<Post> findPostNotNFTByUserSeq(Long userSeq) {
         List<Post> posts = jpaQueryFactory.select(qPost).from(qPost)
                 .where(qPost.user.userSeq.eq(userSeq).and(qPost.postIsNft.eq(false))).fetch();
        return posts;
    }
}
