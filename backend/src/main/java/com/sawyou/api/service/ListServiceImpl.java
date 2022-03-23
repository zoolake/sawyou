package com.sawyou.api.service;

import com.sawyou.api.response.PostRes;
import com.sawyou.db.entity.Post;
import com.sawyou.db.entity.User;
import com.sawyou.db.repository.PostRepository;
import com.sawyou.db.repository.PostRepositorySupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * 게시글 리스트, 검색 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("ListService")
public class ListServiceImpl implements ListService {
	@Autowired
	private PostRepository postRepository;

	@Autowired
	private PostRepositorySupport postRepositorySupport;

    @Override
    public List<PostRes> getPostListAll() {
        return postRepository.findAll().stream().filter(post -> !post.isPostIsDelete())
                .map(post -> {
                    User user = post.getUser();
                    return PostRes.builder()
                            .postContent(post.getPostContent())
                            .postPictureLink(post.getPostPictureLink())
                            .postWritingTime(post.getPostWritingTime().toString())
                            .postIsDelete(post.isPostIsDelete())
                            .postIsNft(post.isPostIsNft())
                            .userId(user.getUserId())
                            .userName(user.getUserName())
                            .userProfile(user.getUserProfile()).build();
                }).collect(Collectors.toList());
    }

}
