package com.sawyou.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

/**
 * 게시글 정보 조회 API ([GET] /api/v1/post/{postseq}) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("PostResponse")
public class PostRes {
    @ApiModelProperty(name = "게시물 번호")
    private Long postSeq;
    @ApiModelProperty(name = "게시물 내용")
    private String postContent;
    @ApiModelProperty(name = "게시물 이미지 링크")
    private String postPictureLink;
    @ApiModelProperty(name = "게시물 작성 시간")
    private String postWritingTime;
    @ApiModelProperty(name = "게시물 삭제 여부")
    private boolean postIsDelete;
    @ApiModelProperty(name = "게시물 NFT 여부")
    private boolean postIsNft;
    @ApiModelProperty(name = "게시물 좋아요 체크 여부")
    private boolean postIsLike;
    @ApiModelProperty(name = "게시물 좋아요 수")
    private int postLikeCnt;
    @ApiModelProperty(name = "게시물 댓글 수")
    private int postCommentCnt;

    @ApiModelProperty(name = "게시물 작성자 번호")
    private Long userSeq;
    @ApiModelProperty(name = "게시물 작성자 ID")
    private String userId;
    @ApiModelProperty(name = "게시물 작성자 이름/닉네임")
    private String userName;
    @ApiModelProperty(name = "게시물 작성자 프로필 이미지 링크")
    private String userProfile;
}
