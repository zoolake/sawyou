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
    @ApiModelProperty(name = "댓글 내용")
    String commentContent;
    @ApiModelProperty(name = "댓글 작성 시간")
    String commentWritingTime;
    @ApiModelProperty(name = "댓글 삭제 여부")
    boolean commentIsDelete;
    @ApiModelProperty(name = "댓글 작성자 ID")
    String userId;
    @ApiModelProperty(name = "댓글 작성자 이름/닉네임")
    String userName;
    @ApiModelProperty(name = "댓글 작성자 프로필 이미지 링크")
    String userProfile;
}
