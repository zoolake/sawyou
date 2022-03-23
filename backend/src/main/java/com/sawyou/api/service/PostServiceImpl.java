package com.sawyou.api.service;

import com.sawyou.db.entity.Post;
import com.sawyou.db.entity.User;
import com.sawyou.api.response.PostRes;
import com.sawyou.db.repository.PostRepository;
import com.sawyou.db.repository.PostRepositorySupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 게시글, 댓글 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("PostService")
public class PostServiceImpl implements PostService {
	@Autowired
	private PostRepository postRepository;
	
	@Autowired
	private PostRepositorySupport postRepositorySupport;

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
	public PostRes getPostInfo(Long postSeq) {
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

	@Override
	public Post updatePost(Post post, String postContent) {
		// 원본 객체에 게시글 내용만 변경
		post.setPostContent(postContent);

		// 쿼리가 정상적으로 실행되었다면, 쿼리에 사용된 객체 return
		return postRepository.save(post);
	}
}
