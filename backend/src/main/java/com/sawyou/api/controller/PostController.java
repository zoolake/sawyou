package com.sawyou.api.controller;

import com.sawyou.api.response.PostRes;
import com.sawyou.api.service.PostService;
import io.swagger.annotations.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

/**
 * 게시글, 댓글 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "게시글, 댓글 API", tags = {"Post"})
@RestController
@RequestMapping("/api/v1/post")
public class PostController {
	
	@Autowired
	private PostService postService;

	@GetMapping("/{postSeq}")
	@ApiOperation(value = "게시글 조회", notes = "게시글 정보를 응답한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "게시글 조회 성공"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "찾는 게시글 없음"),
			@ApiResponse(code = 409, message = "게시글 조회 실패"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<Result> getPostInfo(@ApiIgnore Authentication authentication, @ApiParam(value = "조회할 게시글 일련번호", required = true) @PathVariable Long postSeq) {
		// 인증 토큰 확인, 올바르지 않은 토큰일 경우에도 401 자동 리턴
		if (authentication == null) return ResponseEntity.status(401).body(Result.builder().message("인증 실패").build());

		// postSeq 값 기준으로 게시글 찾기
		PostRes post = postService.getPostInfo(postSeq);

		// 게시글 번호에 알맞는 데이터가 없을 경우
		if (post == null) return ResponseEntity.status(404).body(Result.builder().message("찾는 게시글 없음").build());
		// 삭제된 게시글일 경우
		if (post.isPostIsDelete()) return ResponseEntity.status(404).body(Result.builder().message("찾는 게시글 없음").build());

		return ResponseEntity.status(200).body(Result.builder().data(post).status(200).message("게시글 조회 성공").build());
	}

	@Data
	@AllArgsConstructor
	@Builder
	static class Result<T> {
		private T data;
		private int status;
		private String message;
	}
}
