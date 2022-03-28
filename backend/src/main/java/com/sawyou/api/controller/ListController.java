package com.sawyou.api.controller;

import com.sawyou.api.response.HashtagRes;
import com.sawyou.api.response.PostRes;
import com.sawyou.api.response.UserListRes;
import com.sawyou.api.service.ListService;
import com.sawyou.common.auth.SawyouUserDetails;
import com.sawyou.common.model.response.Result;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
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
    public ResponseEntity<Result> getPostListAll(
            @ApiIgnore Authentication authentication,
            Pageable pageable
    ) {
        if(authentication == null)
            return ResponseEntity.status(401).body(Result.builder().status(401).message("인증 실패").build());

        List<PostRes> lists = listService.getPostListAll(pageable);

        if(lists.isEmpty())
            return ResponseEntity.status(404).body(Result.builder().status(404).message("게시글 없음").build());

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
    public ResponseEntity<Result> getPostListFollowing(
            @ApiIgnore Authentication authentication,
            Pageable pageable
    ) {
        if(authentication == null)
            return ResponseEntity.status(401).body(Result.builder().status(401).message("인증 실패").build());

        SawyouUserDetails userDetails = (SawyouUserDetails) authentication.getDetails();
        Long userSeq = userDetails.getUser().getUserSeq();

        List<PostRes> lists = listService.getPostListFollowing(userSeq, pageable);

        if(lists.isEmpty())
            return ResponseEntity.status(404).body(Result.builder().status(404).message("게시글 없음").build());

        return ResponseEntity.status(200).body(Result.builder().data(lists).status(200).message("팔로잉 게시글 조회 성공").build());
    }

    @GetMapping("/{userSeq}")
    @ApiOperation(value = "유저 게시글 조회", notes = "유저의 게시글 리스트를 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "게시글 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<Result> getPostListUser(
            @ApiIgnore Authentication authentication,
            @PathVariable @ApiParam(value = "조회할 유저", required = true) Long userSeq,
            Pageable pageable
    ) {
        if(authentication == null)
            return ResponseEntity.status(401).body(Result.builder().status(401).message("인증 실패").build());

        List<PostRes> lists = listService.getPostListUser(userSeq, pageable);

        if(lists.isEmpty())
            return ResponseEntity.status(404).body(Result.builder().status(404).message("게시글 없음").build());

        return ResponseEntity.status(200).body(Result.builder().data(lists).status(200).message("유저 게시글 조회 성공").build());
    }

    @GetMapping("/hashtag/{hashtagSeq}")
    @ApiOperation(value = "해시태그 게시글 조회", notes = "해시태그를 포함한 게시글 리스트를 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "게시글 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<Result> getPostListHashtag(
            @ApiIgnore Authentication authentication,
            @PathVariable @ApiParam(value = "조회할 해시태그", required = true) Long hashtagSeq,
            Pageable pageable
    ) {
        if(authentication == null)
            return ResponseEntity.status(401).body(Result.builder().status(401).message("인증 실패").build());

        List<PostRes> lists = listService.getPostListHashtag(hashtagSeq, pageable);

        if(lists.isEmpty())
            return ResponseEntity.status(404).body(Result.builder().status(404).message("게시글 없음").build());

        return ResponseEntity.status(200).body(Result.builder().data(lists).status(200).message("해시태그 게시글 조회 성공").build());
    }

    @GetMapping("/search/user")
    @ApiOperation(value = "계정 검색", notes = "검색어를 포함하는 아이디 또는 이름을 갖는 유저를 검색한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "유저 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<Result> searchUserList(
            @ApiIgnore Authentication authentication,
            @RequestBody @ApiParam(value = "검색할 키워드", required = true) String keyword
    ) {
        if(authentication == null)
            return ResponseEntity.status(401).body(Result.builder().status(401).message("인증 실패").build());

        List<UserListRes> lists = listService.searchUserList(keyword);

        if(lists.isEmpty())
            return ResponseEntity.status(404).body(Result.builder().status(404).message("해당 계정 없음").build());

        return ResponseEntity.status(200).body(Result.builder().data(lists).status(200).message("계정 검색 성공").build());
    }

    @GetMapping("/search/hashtag")
    @ApiOperation(value = "해시태그 검색", notes = "검색어를 포함하는 해시태그를 검색한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "해시태그 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<Result> searchHashtagList(
            @ApiIgnore Authentication authentication,
            @RequestBody @ApiParam(value = "검색할 키워드", required = true) String keyword
    ) {
        if(authentication == null)
            return ResponseEntity.status(401).body(Result.builder().status(401).message("인증 실패").build());

        List<HashtagRes> lists = listService.searchHashtagList(keyword);

        if(lists.isEmpty())
            return ResponseEntity.status(404).body(Result.builder().status(404).message("해당 해시태그 없음").build());

        return ResponseEntity.status(200).body(Result.builder().data(lists).status(200).message("해시태그 검색 성공").build());
    }
}