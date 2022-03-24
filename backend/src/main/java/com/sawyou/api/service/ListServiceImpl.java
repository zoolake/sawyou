package com.sawyou.api.service;

import com.sawyou.api.response.PostRes;
import com.sawyou.api.response.UserListRes;
import com.sawyou.db.entity.Post;
import com.sawyou.db.entity.User;
import com.sawyou.db.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
    private UserRepositorySupport userRepositorySupport;

    @Autowired
    private FollowingRepository followingRepository;

	@Autowired
	private PostRepositorySupport postRepositorySupport;

    // 모든 게시글 조회
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

    // 팔로잉 게시글 조회
    @Override
    public List<PostRes> getPostListFollowing(Long userSeq) {
        // 팔로잉 리스트에서 유저가 팔로잉하는 유저 목록을 찾고 -> 그 유저가 작성한 글 리스트를 뽑는다.
        List<PostRes> postResList = new ArrayList<>();

        followingRepository.findByUser_UserSeq(userSeq).forEach(following -> {
            Long toSeq = following.getFollowingToSeq();
            User user = userRepositorySupport.findUserByUserSeq(toSeq).get();
            postRepository.findByUser_UserSeqAndPostIsDeleteIsFalse(user.getUserSeq()).forEach(post ->
                    postResList.add(PostRes.builder()
                            .postContent(post.getPostContent())
                            .postPictureLink(post.getPostPictureLink())
                            .postWritingTime(post.getPostWritingTime().toString())
                            .postIsDelete(post.isPostIsDelete())
                            .postIsNft(post.isPostIsNft())
                            .userId(user.getUserId())
                            .userName(user.getUserName())
                            .userProfile(user.getUserProfile()).build())
            );
        });
        return postResList;
    }

    // 계정 검색
    @Override
    public List<UserListRes> searchUserList(String keyword) {
        return userRepositorySupport.findUserByKeyword(keyword).stream().map(user ->
                UserListRes.builder()
                        .userId(user.getUserId())
                        .userName(user.getUserName())
                        .userProfile(user.getUserProfile()).build()
        ).collect(Collectors.toList());
    }

}
