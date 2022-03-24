package com.sawyou.api.service;

import com.sawyou.api.request.UserUpdateInfoReq;
import com.sawyou.api.request.UserUpdatePwdReq;
import com.sawyou.api.response.UserListRes;
import com.sawyou.api.response.UserRes;
import com.sawyou.db.entity.*;
import com.sawyou.db.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.sawyou.api.request.UserRegisterPostReq;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * 유저 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("userService")
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserRepositorySupport userRepositorySupport;

    @Autowired
    private FollowingRepository followingRepository;

    @Autowired
    private FollowingRepositorySupport followingRepositorySupport;

    @Autowired
    private FollowerRepository followerRepository;

    @Autowired
    private FollowerRepositorySupport followerRepositorySupport;

    @Autowired
    private CommentLikeRepository commentLikeRepository;

    @Autowired
    private CommentLikeRepositorySupport commentLikeRepositorySupport;

    @Autowired
    private CommentRepositorySupport commentRepositorySupport;

    @Autowired
    private PostLikeRepository postLikeRepository;

    @Autowired
    private PostLikeRepositorySupport postLikeRepositorySupport;

    @Autowired
    private PostRepositorySupport postRepositorySupport;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // 회원가입
    @Override
    public User createUser(UserRegisterPostReq userRegisterInfo) {
        User user = User.builder()
                .userId(userRegisterInfo.getUserId())
                // 보안을 위해서 유저 패스워드 암호화 하여 디비에 저장.
                .userPwd(passwordEncoder.encode(userRegisterInfo.getUserPwd()))
                .userName(userRegisterInfo.getUserName())
                .userEmail(userRegisterInfo.getUserEmail())
                .userDesc(userRegisterInfo.getUserDesc())
                .build();
        
        return userRepository.save(user);
    }

    // 유저 id로 유저 조회
    @Override
    public User getUserByUserId(String userId) {
        // 디비에 유저 정보 조회 (userId로 조회).
        Optional<User> user = userRepositorySupport.findUserByUserId(userId);
        if(!user.isPresent())
            return null;

        return user.get();
    }

    // 유저 seq로 유저 조회 (조회할 유저의 userSeq, 나의 userSeq) - 나와 상대방 사이의 관계 파악
    @Override
    public UserRes getUser(Long userSeq, Long fromSeq) {
        Optional<User> oUser = userRepositorySupport.findUserByUserSeq(userSeq);

        if(!oUser.isPresent())
            return null;

        User user = oUser.get();

        if(user.isUserIsDelete())
            return null;

        boolean isFollowing = false;
        if(followingRepositorySupport.findFollowingByUserSeqAndFromSeq(userSeq, fromSeq).isPresent())
            isFollowing = true;

        return UserRes.builder()
                .userSeq(user.getUserSeq())
                .userId(user.getUserId())
                .userName(user.getUserName())
                .userEmail(user.getUserEmail())
                .userDesc(user.getUserDesc())
                .userProfile(user.getUserProfile())
                .followingCnt(user.getFollowings().size())
                .followerCnt(user.getFollowers().size())
                .isFollowing(isFollowing)
                .build();
    }

    // 유저 정보 수정
    @Override
    @Transactional
    public User updateUserInfo(UserUpdateInfoReq updateInfo, Long userSeq) {
        User user = userRepositorySupport.findUserByUserSeq(userSeq).get();

        if(StringUtils.hasText(updateInfo.getUserId()))
            user.setUserId(updateInfo.getUserId());

        if(StringUtils.hasText(updateInfo.getUserName()))
            user.setUserName(updateInfo.getUserName());

        if(StringUtils.hasText(updateInfo.getUserEmail()))
            user.setUserEmail(updateInfo.getUserEmail());

        if(StringUtils.hasText(updateInfo.getUserDesc()))
            user.setUserDesc(updateInfo.getUserDesc());

        if(StringUtils.hasText(updateInfo.getUserProfile()))
            user.setUserProfile(updateInfo.getUserProfile());

        return user;
    }

    // 유저 비밀번호 수정
    @Override
    @Transactional
    public User updateUserPwd(UserUpdatePwdReq updatePwd, Long userSeq) {
        User user = userRepositorySupport.findUserByUserSeq(userSeq).get();

        if(StringUtils.hasText(updatePwd.getUserPwd()))
            user.setUserPwd(passwordEncoder.encode(updatePwd.getUserPwd()));

        return user;
    }

    // 유저 팔로잉/취소
    @Override
    @Transactional
    public boolean followingUser(User user, Long followingToSeq) {
        // user = 본인, followingToSeq = 팔로잉할 상대 Seq
        // followingFromSeq == followerToSeq  /  followingToSeq == followerFromSeq
        User followingUser = userRepositorySupport.findUserByUserSeq(followingToSeq).get();

        //followingRepositorySupport.findFollowingByUserSeq(상대 Seq, 본인 Seq)
        Optional<Following> following = followingRepositorySupport.findFollowingByUserSeqAndFromSeq(followingToSeq, user.getUserSeq());

        if(following.isPresent()) {
            /*
             * 1. 팔로잉이 존재하면
             * 2. 팔로워 테이블에서 삭제하고
             * 3. 팔로잉 테이블에서 삭제
            */
            //followerRepositorySupport.findFollowerByUserSeq(상대 Seq, 본인 Seq)
            Optional<Follower> follower = followerRepositorySupport.findFollowerByUserSeqAndToSeq(followingToSeq, user.getUserSeq());
            if(follower.isPresent())
                followerRepository.delete(follower.get());

            followingRepository.delete(following.get());
            return false;
        } else {
            /*
             * 1. 팔로잉이 존재하지 않으면
             * 2. 팔로워 테이블에 추가하고
             * 3. 팔로잉 테이블에 추가
             */
            Follower newFollower = Follower.builder().followerFromSeq(followingToSeq).user(user).build();
            followerRepository.save(newFollower);
            Following newFollowing = Following.builder().followingToSeq(followingToSeq).user(user).build();
            followingRepository.save(newFollowing);
            return true;
        }
    }

    // 유저의 팔로잉 리스트 조회
    @Override
    public List<UserListRes> getUserFollowingList(Long userSeq) {
        User user = userRepositorySupport.findUserByUserSeq(userSeq).get();

        return user.getFollowings().stream().map(following -> {
            Long followingToSeq = following.getFollowingToSeq();
            User follow = userRepositorySupport.findUserByUserSeq(followingToSeq).get();
            return UserListRes.builder()
                    .userSeq(follow.getUserSeq())
                    .userId(follow.getUserId())
                    .userName(follow.getUserName())
                    .userProfile(follow.getUserProfile())
                    .build();
        }).collect(Collectors.toList());
    }

    // 유저희 팔로워 리스트 조회
    @Override
    public List<UserListRes> getUserFollowerList(Long userSeq) {
        User user = userRepositorySupport.findUserByUserSeq(userSeq).get();

        return user.getFollowers().stream().map(follower -> {
            Long followerFromSeq = follower.getFollowerFromSeq();
            User follow = userRepositorySupport.findUserByUserSeq(followerFromSeq).get();
            return UserListRes.builder()
                    .userSeq(follow.getUserSeq())
                    .userId(follow.getUserId())
                    .userName(follow.getUserName())
                    .userProfile(follow.getUserProfile())
                    .build();
        }).collect(Collectors.toList());
    }

    // 회원 탈퇴
    @Override
    @Transactional
    public User deleteUser(User user) {
        // TODO : 댓글 삭제 처리 어떤 방식으로 할 건지 고민 (댓글의 isDelete true / 댓글은 남기고 유저 아이디를 클릭했을 때 찾을 수 없는 유저 표시)
        /*
         * 1. 유저의 팔로워/팔로잉 삭제
         *    1-1. 팔로잉 테이블에서 fromSeq, toSeq가 userSeq인 거 찾아서 모두 삭제
         *    1-2. 팔로워 테이블에서 fromSeq, toSeq가 userSeq인 거 찾아서 모두 삭제
         * 2. 유저의 게시글/댓글 좋아요 삭제
         * 3. 댓글 삭제
         * 4. 유저의 게시글 중 NFT화 되지 않은 게시글 리스트를 찾고
         *    4-1. 해당 게시글에 속한 댓글의 좋아요 delete
         *    4-2. 해당 게시글에 속한 댓글 isDelete true 처리
         *    4-3. 해당 게시글의 좋아요 delete
         *    4-4. 해당 게시글 isDelete true 처리
         * 5. 유저 isDelete true 처리
         */
        Long userSeq = user.getUserSeq();

        // 1
        followingRepositorySupport.deleteFollowingByFromSeq(userSeq);
        followingRepository.deleteByFollowingToSeq(userSeq);

        followerRepositorySupport.deleteFollowerByToSeq(userSeq);
        followerRepository.deleteByFollowerFromSeq(userSeq);

        // 2
        commentLikeRepositorySupport.deleteCommentLikeByUserSeq(userSeq);
        postLikeRepositorySupport.deletePostLikeByUserSeq(userSeq);

        // 3 - 댓글 삭제 처리는 어떻게 할지 고민
        commentRepositorySupport.findAllByUserSeq(userSeq).forEach(comment -> comment.setCommentIsDelete(true));

        // 4
        List<Post> posts = postRepositorySupport.findPostNotNFTByUserSeq(userSeq);
        posts.forEach(post -> {
            post.getComments().forEach(comment -> {
                    comment.getCommentLikes().forEach(commentLike -> commentLikeRepository.delete(commentLike));
                    comment.setCommentIsDelete(true);
            });
            post.getPostLikes().forEach(postLike -> postLikeRepository.delete(postLike));
            post.setPostIsDelete(true);
        });

        // 5
        user.setUserIsDelete(true);

        return user;
    }
}
