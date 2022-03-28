package com.sawyou.api.service;

import com.sawyou.api.response.HashtagRes;
import com.sawyou.api.response.PostRes;
import com.sawyou.api.response.UserListRes;
import com.sawyou.db.entity.Post;
import com.sawyou.db.entity.PostLike;
import com.sawyou.db.entity.User;
import com.sawyou.db.repository.*;
import org.checkerframework.checker.units.qual.Length;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.JpaSort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
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
    private UserRepository userRepository;

    @Autowired
    private UserRepositorySupport userRepositorySupport;

    @Autowired
    private FollowingRepository followingRepository;

    @Autowired
    private HashtagRepository hashtagRepository;

    @Autowired
    private PostHashtagRepository postHashtagRepository;

    @Autowired
    private PostLikeRepository postLikeRepository;

    // 모든 게시글 조회
    @Override
    public List<PostRes> getPostListAll(Pageable pageable) {
        return postRepository.findAllByPostIsDeleteFalseOrderByPostWritingTimeDesc(pageable).stream().map(post -> {
                    User user = post.getUser();
                    PostLike postLike = postLikeRepository.findByUser_UserSeqAndPost_PostSeq(user.getUserSeq(), post.getPostSeq());
                    return PostRes.builder()
                            .postSeq(post.getPostSeq())
                            .postContent(post.getPostContent())
                            .postPictureLink(post.getPostPictureLink())
                            .postWritingTime(post.getPostWritingTime().toString())
                            .postIsDelete(post.isPostIsDelete())
                            .postIsNft(post.isPostIsNft())
                            .postIsLike(postLike != null)
                            .postLikeCnt(post.getPostLikes().size())
                            .postCommentCnt(
                                    post.getComments().stream().filter(comment
                                            -> !comment.isCommentIsDelete()
                                    ).collect(Collectors.toList()).size()
                            )
                            .userSeq(user.getUserSeq())
                            .userId(user.getUserId())
                            .userName(user.getUserName())
                            .userProfile(user.getUserProfile()).build();
                }).sorted(Comparator.comparing(PostRes::getPostWritingTime).reversed()).collect(Collectors.toList());
    }

    // 팔로잉 게시글 조회
    @Override
    public List<PostRes> getPostListFollowing(Long userSeq) {
        // 팔로잉 리스트에서 유저가 팔로잉하는 유저 목록을 찾고 -> 그 유저가 작성한 글 리스트를 뽑는다.
        List<PostRes> postResList = new ArrayList<>();

        followingRepository.findByUser_UserSeq(userSeq).forEach(following -> {
            Long toSeq = following.getFollowingToSeq();
            User user = userRepositorySupport.findUserByUserSeq(toSeq).get();
            postRepository.findByUser_UserSeqAndPostIsDeleteIsFalseOrderByPostWritingTimeDesc(user.getUserSeq()).forEach(post -> {
                PostLike postLike = postLikeRepository.findByUser_UserSeqAndPost_PostSeq(user.getUserSeq(), post.getPostSeq());
                postResList.add(PostRes.builder()
                        .postSeq(post.getPostSeq())
                        .postContent(post.getPostContent())
                        .postPictureLink(post.getPostPictureLink())
                        .postWritingTime(post.getPostWritingTime().toString())
                        .postIsDelete(post.isPostIsDelete())
                        .postIsNft(post.isPostIsNft())
                        .postIsLike(postLike != null)
                        .postLikeCnt(post.getPostLikes().size())
                        .postCommentCnt(
                                post.getComments().stream().filter(comment
                                        -> !comment.isCommentIsDelete()
                                ).collect(Collectors.toList()).size()
                        )
                        .userSeq(user.getUserSeq())
                        .userId(user.getUserId())
                        .userName(user.getUserName())
                        .userProfile(user.getUserProfile()).build());
            });
        });
        return postResList;
    }

    // 유저 게시글 조회
    @Override
    public List<PostRes> getPostListUser(Long userSeq, Pageable pageable) {
//        return user.getPosts().stream().filter(post -> !post.isPostIsDelete()).map(post -> {
        return postRepository.findByUser_UserSeqAndPostIsDeleteIsFalseOrderByPostWritingTimeDesc(userSeq, pageable).stream().map(post -> {
            User user = userRepositorySupport.findUserByUserSeq(userSeq).get();
            PostLike postLike = postLikeRepository.findByUser_UserSeqAndPost_PostSeq(user.getUserSeq(), post.getPostSeq());
            return PostRes.builder()
                    .postSeq(post.getPostSeq())
                    .postContent(post.getPostContent())
                    .postPictureLink(post.getPostPictureLink())
                    .postWritingTime(post.getPostWritingTime().toString())
                    .postIsDelete(post.isPostIsDelete())
                    .postIsNft(post.isPostIsNft())
                    .postIsLike(postLike != null)
                    .postLikeCnt(post.getPostLikes().size())
                    .postCommentCnt(
                            post.getComments().stream().filter(comment
                                    -> !comment.isCommentIsDelete()
                            ).collect(Collectors.toList()).size()
                    )
                    .userSeq(user.getUserSeq())
                    .userName(user.getUserName())
                    .userId(user.getUserId())
                    .userProfile(user.getUserProfile()).build();
        }).collect(Collectors.toList());
    }

    // 해시태그 게시글 조회
    @Override
    public List<PostRes> getPostListHashtag(Long hashtagSeq) {
        return postHashtagRepository.findPostHashtagByHashtag_HashtagSeq(hashtagSeq).stream().map(postHashtag -> {
            Post post = postHashtag.getPost();
            User user = post.getUser();
            PostLike postLike = postLikeRepository.findByUser_UserSeqAndPost_PostSeq(user.getUserSeq(), post.getPostSeq());
            return PostRes.builder()
                    .postSeq(post.getPostSeq())
                    .postContent(post.getPostContent())
                    .postPictureLink(post.getPostPictureLink())
                    .postWritingTime(post.getPostWritingTime().toString())
                    .postIsDelete(post.isPostIsDelete())
                    .postIsNft(post.isPostIsNft())
                    .postIsLike(postLike != null)
                    .postLikeCnt(post.getPostLikes().size())
                    .postCommentCnt(
                            post.getComments().stream().filter(comment
                                    -> !comment.isCommentIsDelete()
                            ).collect(Collectors.toList()).size()
                    )
                    .userSeq(user.getUserSeq())
                    .userId(user.getUserId())
                    .userName(user.getUserName())
                    .userProfile(user.getUserProfile()).build();
        }).sorted(Comparator.comparing(PostRes::getPostLikeCnt).reversed().thenComparing(Comparator.comparing(PostRes::getPostWritingTime).reversed())).collect(Collectors.toList());
        // 게시글 좋아요 역순으로 정렬 -> 같으면 시간 역순 정렬
    }

    // 계정 검색
    @Override
    public List<UserListRes> searchUserList(String keyword) {
        List<User> userList = new ArrayList<>();
        List<Long> userSeqList = new ArrayList<>();

        // 최상단에 가장 유사한 아이디 3개, 이름 3개 먼저 출력 후 나머지 출력
        List<User> userIdList = userRepository.findByUserIdStartsWith(keyword, JpaSort.unsafe("Length(userId)"));
        userIdList.stream().limit(3).forEach(user -> {
            userList.add(user);
            userSeqList.add(user.getUserSeq());
        });

        final int[] cnt = {0};
        List<User> userNameList = userRepository.findByUserNameStartsWith(keyword, JpaSort.unsafe("Length(userName)"));
        userNameList.forEach(user -> {
            if(cnt[0] == 3)
                return;
            if(userSeqList.contains(user.getUserSeq()))
                return;
            userList.add(user);
            userSeqList.add(user.getUserSeq());
            cnt[0]++;
        });

        userRepositorySupport.findUserByKeyword(keyword).stream().filter(user-> !userSeqList.contains(user.getUserSeq()))
                .forEach(user -> userList.add(user));

        return userList.stream().map(user ->
                        UserListRes.builder()
                                .userSeq(user.getUserSeq())
                                .userId(user.getUserId())
                                .userName(user.getUserName())
                                .userProfile(user.getUserProfile()).build()
        ).collect(Collectors.toList());
    }

    // 해시태그 검색
    @Override
    public List<HashtagRes> searchHashtagList(String keyword) {
        return hashtagRepository.findByHashtagNameContains(keyword).stream().map(hashtag -> {
            int cnt = postHashtagRepository.countPostHashtagByHashtag_HashtagSeq(hashtag.getHashtagSeq());
            return HashtagRes.builder()
                    .hashtagSeq(hashtag.getHashtagSeq())
                    .hashtagName(hashtag.getHashtagName())
                    .hashtagCnt(cnt).build();
        }).sorted().collect(Collectors.toList());
    }
}
