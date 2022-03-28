package com.sawyou.api.service;

import com.sawyou.api.response.NftOnSaleRes;

import java.util.List;

/**
 *	NFT 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface NFTService {
    //판매중인 NFT 조회
    public List<NftOnSaleRes> getOnSaleList ();
}
