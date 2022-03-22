package com.sawyou.api.service;

import com.sawyou.api.request.UserUpdateInfoReq;
import com.sawyou.api.request.UserUpdatePwdReq;
import com.sawyou.api.response.UserRes;
import com.sawyou.db.entity.Follower;
import com.sawyou.db.entity.Following;
import com.sawyou.db.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.sawyou.api.request.UserRegisterPostReq;
import com.sawyou.db.entity.User;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.Objects;
import java.util.Optional;

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
    private PasswordEncoder passwordEncoder;

    @Override
    public User createUser(UserRegisterPostReq userRegisterInfo) {
        System.out.println("userRegisterInfo.getUserDesc() = " + userRegisterInfo.getUserDesc());
        
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

    @Override
    public User getUserByUserId(String userId) {
        // 디비에 유저 정보 조회 (userId 를 통한 조회).
        Optional<User> user = userRepositorySupport.findUserByUserId(userId);
        if(!user.isPresent()) return null;

        return user.get();
    }

    @Override
    public UserRes getUser(Long userSeq, Long fromSeq) {
        Optional<User> oUser = userRepositorySupport.findUserByUserSeq(userSeq);
        if(!oUser.isPresent()) return null;
        User user = oUser.get();

        boolean isFollowing = false;
        if(followingRepositorySupport.findFollowingByUserSeq(userSeq, fromSeq).isPresent())  isFollowing = true;

        return UserRes.builder()
                .userId(user.getUserId())
                .userName(user.getUserName())
                .userEmail(user.getUserEmail())
                .userDesc(user.getUserDesc())
                .userProfile(user.getUserProfile())
                .isFollowing(isFollowing)
                .build();
    }


    @Override
    @Transactional
    public User updateUserInfo(UserUpdateInfoReq updateInfo, Long userSeq) {
        User user = userRepositorySupport.findUserByUserSeq(userSeq).get();

        if(StringUtils.hasText(updateInfo.getUserId())) {
            user.setUserId(updateInfo.getUserId());
        }
        if(StringUtils.hasText(updateInfo.getUserName())) {
            user.setUserName(updateInfo.getUserName());
        }
        if(StringUtils.hasText(updateInfo.getUserEmail())) {
            user.setUserEmail(updateInfo.getUserEmail());
        }
        if(StringUtils.hasText(updateInfo.getUserDesc())) {
            user.setUserDesc(updateInfo.getUserDesc());
        }
        if(StringUtils.hasText(updateInfo.getUserProfile())) {
            user.setUserProfile(updateInfo.getUserProfile());
        }
        return user;
    }

    @Override
    @Transactional
    public User updateUserPwd(UserUpdatePwdReq updatePwd, Long userSeq) {
        User user = userRepositorySupport.findUserByUserSeq(userSeq).get();

        if(StringUtils.hasText(updatePwd.getUserPwd())) {
            user.setUserPwd(passwordEncoder.encode(updatePwd.getUserPwd()));
        }
        return user;
    }

    @Override
    @Transactional
    public boolean followingUser(User user, Long followingToSeq) {
        // user = 본인, followingToSeq = 팔로잉할 상대 Seq
        // followingFromSeq == followerToSeq  /  followingToSeq == followerFromSeq

        System.out.println("user.getUserSeq() = " + user.getUserSeq());
        System.out.println("followingToSeq = " + followingToSeq);
        //followingRepositorySupport.findFollowingByUserSeq(상대 Seq, 본인 Seq)
        Optional<Following> following = followingRepositorySupport.findFollowingByUserSeq(followingToSeq, user.getUserSeq());

        if(following.isPresent()) {
            /**
             * 1. 팔로잉이 존재하면
             * 2. 팔로워 테이블에서 삭제하고
             * 3. 팔로잉 테이블에서 삭제
            */
            //followerRepositorySupport.findFollowerByUserSeq(상대 Seq, 본인 Seq)
            Optional<Follower> follower = followerRepositorySupport.findFollowerByUserSeq(followingToSeq, user.getUserSeq());
            if(follower.isPresent())  followerRepository.delete(follower.get());

            followingRepository.delete(following.get());
            return false;
        } else {
            /**
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
}
