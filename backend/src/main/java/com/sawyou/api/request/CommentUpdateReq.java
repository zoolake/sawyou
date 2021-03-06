package com.sawyou.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 댓글 수정 API ([PATCH] /api/v1/post/comment/{postReq}) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@ApiModel("CommentUpdateRequest")
public class CommentUpdateReq {
    @ApiModelProperty(name = "댓글 수정 내용", example = "comment_content")
    private String commentContent;
}
