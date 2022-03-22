package com.sawyou.api.service;

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
	public Post getPostInfo(Long postSeq) {
		// JPA의 기본 메소드를 활용하여 postRepo에 해당 메소드 명시 없이 PK값을 가지고 데이터 찾음
		return postRepository.getById(postSeq);
	}
}
