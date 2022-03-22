package com.sawyou.api.service;

import com.sawyou.db.entity.Post;
import com.sawyou.db.entity.User;
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

	// 게시글 작성
	@Override
	public Post writePost(String postContent, Long userSeq) {
		Post post = new Post();

		// TODO: 게시글에 들어갈 이미지 업로드, 이미지 경로 설정 작업 필요
		// DB에 들어갈 데이터 설정
		post.setPostContent(postContent);
		post.setPostPictureLink("dummyLink");
		post.setUser(new User());
		post.getUser().setUserSeq(userSeq);

		// 객체가 정상적으로 생성되었다면, 생성된 객체 return
		return postRepository.save(post);
	}
}
