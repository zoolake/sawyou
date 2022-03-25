package com.sawyou.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("HashtagResponse")
public class HashtagRes {
    @ApiModelProperty(name = "해시태그 번호")
    private Long hashtagSeq;

    @ApiModelProperty(name = "해시태그 이름")
    private String hashtagName;

    @ApiModelProperty(name = "해시태그 게시글 갯수")
    private int hashtagCnt;
}
