package com.sawyou.api.controller;

import com.sawyou.api.response.PostRes;
import com.sawyou.api.service.ListService;
import com.sawyou.common.auth.SawyouUserDetails;
import com.sawyou.common.model.response.Result;
import com.sawyou.db.entity.Post;
import io.swagger.annotations.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

/**
 * 게시글 리스트, 검색 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "게시글 리스트, 검색 API", tags = {"List"})
@RestController
@RequestMapping("/api/v1/list")
public class ListController {

    @Autowired
    private ListService listService;

    @GetMapping
    @ApiOperation(value = "게시글 전체 조회", notes = "모든 게시글 리스트를 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "게시글 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<Result> getPostListAll(@ApiIgnore Authentication authentication) {
        if(authentication == null) return ResponseEntity.status(401).body(Result.builder().status(401).message("인증 실패").build());

        List<PostRes> lists = listService.getPostListAll();
        if(lists.isEmpty()) return ResponseEntity.status(404).body(Result.builder().status(404).message("게시글 없음").build());

        return ResponseEntity.status(200).body(Result.builder().data(lists).status(200).message("전체 게시글 조회 성공").build());
    }

    @GetMapping("/following")
    @ApiOperation(value = "팔로잉 게시글 조회", notes = "유저가 팔로잉한 유저들의 게시글 리스트를 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "게시글 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<Result> getPostListFollowing(@ApiIgnore Authentication authentication) {
        if(authentication == null) return ResponseEntity.status(401).body(Result.builder().status(401).message("인증 실패").build());

        SawyouUserDetails userDetails = (SawyouUserDetails) authentication.getDetails();
        Long userSeq = userDetails.getUser().getUserSeq();

        List<PostRes> lists = listService.getPostListFollowing(userSeq);
        if(lists.isEmpty()) return ResponseEntity.status(404).body(Result.builder().status(404).message("게시글 없음").build());

        return ResponseEntity.status(200).body(Result.builder().data(lists).status(200).message("전체 게시글 조회 성공").build());
    }
}
