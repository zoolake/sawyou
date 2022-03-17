package com.sawyou.api.controller;

import com.sawyou.api.service.NFTService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * NFT 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "NFT API", tags = {"NFT"})
@RestController
@RequestMapping("/api/v1/nft")
public class NFTController {
	
	@Autowired
	private NFTService nftService;

}
