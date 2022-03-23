package com.sawyou.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 게시글 수정 API ([PATCH] /api/v1/post/{postSeq}) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ApiModel("PostUpdateRequest")
public class PostUpdateReq {
    @ApiModelProperty(name = "게시글 수정 내용", example = "post_content")
    private String postContent;
}
