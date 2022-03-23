package com.sawyou.api.service;

import com.sawyou.api.response.PostRes;
import com.sawyou.db.entity.Post;
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
}
