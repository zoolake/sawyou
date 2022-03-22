package com.sawyou.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 게시글 작성 API ([POST] /api/v1/post) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ApiModel("PostWriteRequest")
public class PostWriteReq {
    @ApiModelProperty(name = "게시글 작성 내용", example = "post_content")
    private String postContent;
}
