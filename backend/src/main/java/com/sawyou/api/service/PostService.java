package com.sawyou.api.service;

import com.sawyou.api.response.CommentRes;
import com.sawyou.db.entity.Comment;
import com.sawyou.db.entity.CommentLike;
import com.sawyou.db.entity.Post;
import com.sawyou.api.response.PostRes;
import com.sawyou.db.entity.PostLike;

import java.util.List;

/**
 *	게시글, 댓글 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface PostService {
    // 게시글 Seq 값으로 찾기
    Post getPostByPostSeq(Long postSeq);

    // 게시글 작성
    Post writePost(String postContent, Long userSeq);

    // 게시글 조회
    PostRes getPostInfo(Long postSeq);

    // 게시글 수정
    Post updatePost(Post post, String postContent);

    // 게시글 삭제
    Post deletePost(Post post);

    // 게시글 좋아요
    PostLike likePost(Long userSeq, Long postSeq);

    // 댓글 Seq 값으로 찾기
    Comment getCommentByCommentSeq(Long commentSeq);

    // 댓글 작성
    Comment writeComment(String commentContent, Long postSeq, Long userSeq);

    // 댓글 조회
    List<CommentRes> getComments(Long postSeq);

    // 댓글 수정
    Comment updateComment(Comment comment, String commentContent);

    // 댓글 좋아요
    CommentLike likeComment(Long userSeq, Long commentSeq);
}
