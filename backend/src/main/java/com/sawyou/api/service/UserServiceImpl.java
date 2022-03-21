package com.sawyou.api.service;

import com.sawyou.api.response.UserRes;
import com.sawyou.db.repository.FollowingRepositorySupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.sawyou.api.request.UserRegisterPostReq;
import com.sawyou.db.entity.User;
import com.sawyou.db.repository.UserRepository;
import com.sawyou.db.repository.UserRepositorySupport;

import java.util.Objects;

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
    private FollowingRepositorySupport followingRepositorySupport;

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
        User user = userRepositorySupport.findUserByUserId(userId).get();
        return user;
    }

    @Override
    public UserRes getUser(Long userSeq, Long fromSeq) {
        if(!userRepositorySupport.findUserByUserSeq(userSeq).isPresent()) return null;
        User user = userRepositorySupport.findUserByUserSeq(userSeq).get();

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
}
