package com.sawyou.api.controller;

import com.sawyou.api.request.PostWriteReq;
import com.sawyou.api.service.PostService;
import com.sawyou.common.auth.SawyouUserDetails;
import com.sawyou.common.model.response.BaseResponseBody;
import com.sawyou.db.entity.Post;
import com.sawyou.db.entity.User;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
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

	@PostMapping("")
	@ApiOperation(value = "게시글 작성", notes = "요청 값에 따라 게시글을 작성한다.")
	@ApiResponses({
			@ApiResponse(code = 201, message = "게시글 작성 성공"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 409, message = "게시글 작성 실패"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<? extends BaseResponseBody> writePost(@ApiIgnore Authentication authentication, @RequestBody @ApiParam(value = "게시글 작성 데이터", required = true) PostWriteReq postWrite) {
		// 인증 토큰 확인, 올바르지 않은 토큰일 경우에도 401 자동 리턴
		if (authentication == null) return ResponseEntity.status(401).body(BaseResponseBody.of(401, "인증 실패"));

		// 토큰에서 사용자의 userSeq 값 추출
		SawyouUserDetails userDetails = (SawyouUserDetails) authentication.getDetails();
		Long userSeq = userDetails.getUser().getUserSeq();

		Post post = postService.writePost(postWrite.getPostContent(), userSeq);

		// 게시글이 제대로 작성되지 않았을 경우
		if (post == null) return ResponseEntity.status(401).body(BaseResponseBody.of(409, "게시글 작성 실패"));
		return ResponseEntity.status(401).body(BaseResponseBody.of(201, "게시글 작성 성공"));
	}

}
