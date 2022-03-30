package com.sawyou.api.controller;

import com.sawyou.api.response.NftOnSaleDetailRes;
import com.sawyou.api.response.NftOnSaleRes;
import com.sawyou.api.service.NFTService;
import com.sawyou.common.model.response.Result;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

/**
 * NFT 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "NFT API", tags = {"NFT"})
@RestController
@RequestMapping("/api/v1/nft")
public class NFTController {
	
	@Autowired
	private NFTService nftService;

	@GetMapping("market")
	@ApiOperation(value = "판매중인 NFT 조회", notes = "판매중인 모든 NFT를 조회한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "판매중인 NFT가 없음"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<Result> getOnSaleList(@ApiIgnore Authentication authentication){
		if(authentication==null) return ResponseEntity.status(401).body(Result.builder().status(401).message("인증 실패").build());

		List<NftOnSaleRes> nftOnSaleRes = nftService.getOnSaleList();
		if(nftOnSaleRes.isEmpty())
			return ResponseEntity.status(404).body(Result.builder().status(404).message("판매중인 NFT가 없음").build());
		return ResponseEntity.status(200).body(Result.builder().status(200).data(nftOnSaleRes).message("판매중인 NFT조회 성공").build());
	}
	@GetMapping("market/{nftSeq}")
	@ApiOperation(value = "판매중인 NFT 상세 조회", notes = "판매중인 특정 NFT를 조회한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "판매중인 NFT가 없음"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<Result> getOnSale(@ApiIgnore Authentication authentication, @PathVariable Long nftSeq){
		if(authentication==null) return ResponseEntity.status(401).body(Result.builder().status(401).message("인증 실패").build());

		NftOnSaleDetailRes nftOnSaleDetailRes = nftService.getOnSale(nftSeq);
		if(nftOnSaleDetailRes==null)
			return ResponseEntity.status(404).body(Result.builder().status(404).message("판매중인 NFT가 없음").build());
		return ResponseEntity.status(200).body(Result.builder().status(200).data(nftOnSaleDetailRes).message("판매중인 NFT 상세 조회 성공").build());
	}


}
