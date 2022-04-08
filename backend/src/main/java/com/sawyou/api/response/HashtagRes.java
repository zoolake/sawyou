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
public class HashtagRes implements Comparable<HashtagRes> {
    @ApiModelProperty(name = "해시태그 번호")
    private Long hashtagSeq;
    @ApiModelProperty(name = "해시태그 이름")
    private String hashtagName;
    @ApiModelProperty(name = "해시태그 게시글 수")
    private int hashtagCnt;

    @Override
    public int compareTo(HashtagRes o) {
        // 해시태그 이름 길이 순 정렬 -> 길이가 같을 경우 게시글 수 역순 정렬
        if(this.hashtagName.length() == o.hashtagName.length())
            return o.hashtagCnt - this.hashtagCnt;
        return this.hashtagName.length() - o.hashtagName.length();
    }
}
