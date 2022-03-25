package com.sawyou.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

/**
 * 댓글 정보 조회 API ([GET] /api/v1/post/comment/{postSeq}) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("CommentResponse")
public class CommentRes {
    @ApiModelProperty(name = "댓글 번호")
    private Long commentSeq;
    @ApiModelProperty(name = "댓글 내용")
    private String commentContent;
    @ApiModelProperty(name = "댓글 작성 시간")
    private String commentWritingTime;
    @ApiModelProperty(name = "댓글 삭제 여부")
    private boolean commentIsDelete;
    @ApiModelProperty(name = "댓글 좋아요 체크 여부")
    private boolean commentIsLike;
    @ApiModelProperty(name = "댓글 좋아요 수")
    private int commentLikeCnt;

    @ApiModelProperty(name = "댓글 작성자 번호")
    private Long userSeq;
    @ApiModelProperty(name = "댓글 작성자 ID")
    private String userId;
    @ApiModelProperty(name = "댓글 작성자 이름/닉네임")
    private String userName;
    @ApiModelProperty(name = "댓글 작성자 프로필 이미지 링크")
    private String userProfile;
}
