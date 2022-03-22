package com.sawyou.api.response;

import com.sawyou.common.model.response.BaseResponseBody;
import com.sawyou.db.entity.Post;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
/**
 * 게시글 정보 조회 API ([GET] /api/v1/post/{postseq}) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
@ApiModel("PostResponse")
public class PostRes extends BaseResponseBody {
    @ApiModelProperty(name = "게시물 내용")
    String postContent;
    @ApiModelProperty(name = "게시물 이미지 링크")
    String postPictureLink;
    @ApiModelProperty(name = "게시물 작성 시간")
    String postWritingTime;
    @ApiModelProperty(name = "게시물 삭제 여부")
    boolean postIsDelete;
    @ApiModelProperty(name = "게시물 NFT 여부")
    boolean postIsNft;
    @ApiModelProperty(name = "게시물 작성자 ID")
    String userId;
    @ApiModelProperty(name = "게시물 작성자 이름/닉네임")
    String userName;
    @ApiModelProperty(name = "게시물 작성자 프로필 이미지 링크")
    String userProfile;

    public static PostRes of(Integer statusCode, String message, Post post) {
        PostRes res = new PostRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setPostContent(post.getPostContent());
        res.setPostPictureLink(post.getPostPictureLink());
        res.setPostWritingTime(post.getPostWritingTime().toString());
        res.setPostIsDelete(post.isPostIsDelete());
        res.setPostIsNft(post.isPostIsNft());
        res.setUserId(post.getUser().getUserId());
        res.setUserName(post.getUser().getUserName());
        res.setUserProfile(post.getUser().getUserProfile());

        return res;
    }
}
