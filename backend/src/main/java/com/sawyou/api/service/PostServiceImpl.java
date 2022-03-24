package com.sawyou.api.service;

import com.sawyou.api.response.CommentRes;
import com.sawyou.db.entity.*;
import com.sawyou.api.response.PostRes;
import com.sawyou.db.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * 게시글, 댓글 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("PostService")
public class PostServiceImpl implements PostService {
    @Autowired
    private PostRepository postRepository;

    @Autowired
    private PostRepositorySupport postRepositorySupport;

    @Autowired
    private PostLikeRepository postLikeRepository;

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private CommentRepositorySupport commentRepositorySupport;

    @Autowired
    private CommentLikeRepository commentLikeRepository;

    // 게시글 Seq 값으로 찾기
    @Override
    public Post getPostByPostSeq(Long postSeq) {
        // JPA의 기본 메소드를 활용하여 postRepo에 해당 메소드 명시 없이 PK값을 가지고 데이터 찾음
        return postRepository.getById(postSeq);
    }

    // 게시글 작성
    @Override
    public Post writePost(String postContent, Long userSeq) {
        // TODO: 게시글에 들어갈 이미지 업로드, 이미지 경로 설정 작업, 게시글 내 해시태그 분리 작업 필요
        // DB에 들어갈 데이터 설정
        Post post = Post.builder()
                .postContent(postContent)
                .postPictureLink("dummyLink")
                .user(
                        User.builder()
                                .userSeq(userSeq)
                                .build()
                )
                .build();

        // 쿼리가 정상적으로 실행되었다면, 쿼리에 사용된 객체 return
        return postRepository.save(post);
    }

    // 게시글 조회
    @Override
    public PostRes getPost(Long postSeq) {
        // JPA의 기본 메소드를 활용하여 postRepo에 해당 메소드 명시 없이 PK값을 가지고 데이터 찾음
        Post post = postRepository.getById(postSeq);

        return PostRes.builder()
                .postContent(post.getPostContent())
                .postPictureLink(post.getPostPictureLink())
                .postWritingTime(post.getPostWritingTime().toString())
                .postIsDelete(post.isPostIsDelete())
                .postIsNft(post.isPostIsNft())
                .userId(post.getUser().getUserId())
                .userName(post.getUser().getUserName())
                .userProfile(post.getUser().getUserProfile())
                .build();
    }

    // 게시글 수정
    @Override
    public Post updatePost(Post post, String postContent) {
        // 원본 객체에 게시글 내용만 변경
        post.setPostContent(postContent);

        // 쿼리가 정상적으로 실행되었다면, 쿼리에 사용된 객체 return
        return postRepository.save(post);
    }

    // 게시글 삭제
    @Override
    public Post deletePost(Post post) {
        // 해당 게시글의 댓글 전부 삭제(isDelete = true)
        // 쿼리가 정상적으로 실행되었다면, 삭제한 데이터 갯수 반환
        Long deleteCommentCount = commentRepositorySupport.updateIsDeleteAllTrueByPost_PostSeqEquals(post.getPostSeq());

        // 해당 게시글의 댓글 좋아요 데이터 전부 삭제
        // 쿼리가 정상적으로 실행되었다면, 삭제한 데이터 갯수 반환
        Long deleteCommentLikeCount = commentLikeRepository.deleteByComment_Post_PostSeqEquals(post.getPostSeq());

        // 해당 게시글의 좋아요 데이터 전부 삭제
        // 쿼리가 정상적으로 실행되었다면, 삭제한 데이터 갯수 반환
        Long deletePostLikeCount = postLikeRepository.deleteByPost_PostSeqEquals(post.getPostSeq());

        // 원본 객체에 게시글 삭제 여부만 변경
        post.setPostIsDelete(true);

        // 쿼리가 정상적으로 실행되었다면, 쿼리에 사용된 객체 return
        return postRepository.save(post);
    }

    // 게시글 좋아요
    @Override
    public PostLike likePost(Long userSeq, Long postSeq) {
        // 이미 게시글에 좋아요를 눌렀는지 판단
        PostLike oPostLike = postLikeRepository.findByUser_UserSeqAndPost_PostSeq(userSeq, postSeq);

        // 이미 좋아요를 누른 게시글이면
        if(oPostLike != null) {
            // 게시글 좋아요 삭제
            postLikeRepository.delete(oPostLike);
            return oPostLike;
        }

        // 게시글 좋아요 추가
        PostLike postLike = PostLike.builder()
                .user(
                        User.builder()
                                .userSeq(userSeq)
                                .build()
                )
                .post(
                        Post.builder()
                                .postSeq(postSeq)
                                .build()
                )
                .build();

        return postLikeRepository.save(postLike);
    }

    // 댓글 Seq 값으로 찾기
    @Override
    public Comment getCommentByCommentSeq(Long commentSeq) {
        // JPA의 기본 메소드를 활용하여 commentRepo에 해당 메소드 명시 없이 PK값을 가지고 데이터 찾음
        return commentRepository.getById(commentSeq);
    }

    // 댓글 작성
    @Override
    public Comment writeComment(String commentContent, Long postSeq, Long userSeq) {
        // DB에 들어갈 데이터 설정
        Comment comment = Comment.builder()
                .commentContent(commentContent)
                .post(
                        Post.builder()
                                .postSeq(postSeq)
                                .build()
                )
                .user(
                        User.builder()
                                .userSeq(userSeq)
                                .build()
                )
                .build();

        // 쿼리가 정상적으로 실행되었다면, 쿼리에 사용된 객체 return
        return commentRepository.save(comment);
    }

    // 댓글 조회
    @Override
    public List<CommentRes> getCommentList(Long postSeq) {
        List<Comment> comments = commentRepository.findByPost_PostSeqIsAndCommentIsDeleteIsFalse(postSeq);
        return comments.stream().
                map(comment -> CommentRes.builder()
                        .commentContent(comment.getCommentContent())
                        .commentWritingTime(comment.getCommentWritingTime().toString())
                        .commentIsDelete(comment.isCommentIsDelete())
                        .userId(comment.getUser().getUserId())
                        .userName(comment.getUser().getUserName())
                        .userProfile(comment.getUser().getUserProfile())
                        .build()
                )
                .collect(Collectors.toList());
    }

    // 댓글 수정
    @Override
    public Comment updateComment(Comment comment, String commentContent) {
        // 원본 객체에 댓글 내용만 변경
        comment.setCommentContent(commentContent);

        // 쿼리가 정상적으로 실행되었다면, 쿼리에 사용된 객체 return
        return commentRepository.save(comment);
    }

    // 댓글 삭제
    @Override
    public Comment deleteComment(Comment comment) {
        // 원본 객체에 댓글 삭제 여부만 변경
        comment.setCommentIsDelete(true);

        // 해당 댓글의 좋아요 데이터 전부 삭제
        // 쿼리가 정상적으로 실행되었다면, 삭제한 데이터 갯수 반환
        Long deleteCount = commentLikeRepository.deleteByComment_CommentSeqEquals(comment.getCommentSeq());

        // 쿼리가 정상적으로 실행되었다면, 쿼리에 사용된 객체 return
        return commentRepository.save(comment);
    }

    // 댓글 좋아요
    @Override
    public CommentLike likeComment(Long userSeq, Long commentSeq) {
        // 이미 댓글에 좋아요를 눌렀는지 판단
        CommentLike oCommentLike = commentLikeRepository.findByUser_UserSeqAndComment_CommentSeq(userSeq, commentSeq);

        // 이미 좋아요를 누른 댓글이면
        if(oCommentLike != null) {
            // 댓글 좋아요 삭제
            commentLikeRepository.delete(oCommentLike);
            return oCommentLike;
        }

        // 댓글 좋아요 추가
        CommentLike commentLike = CommentLike.builder()
                .user(
                        User.builder()
                                .userSeq(userSeq)
                                .build()
                )
                .comment(
                        Comment.builder()
                                .commentSeq(commentSeq)
                                .build()
                )
                .build();

        return commentLikeRepository.save(commentLike);
    }

}
