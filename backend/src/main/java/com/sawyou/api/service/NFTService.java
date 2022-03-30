package com.sawyou.api.service;

import com.sawyou.api.response.NftInfoRes;
import com.sawyou.api.response.NftListRes;
import com.sawyou.api.response.NftOnSaleDetailRes;
import com.sawyou.api.response.NftOnSaleRes;
import java.util.List;

/**
 *	NFT 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface NFTService {
    //판매중인 NFT 조회
    public List<NftOnSaleRes> getOnSaleList ();
    // 유저가 보유중인 NFT 조회
    List<NftListRes> getNftList(Long userSeq);
    public NftOnSaleDetailRes getOnSale (Long nftSeq);

    // NFT 상세 조회 성공
    NftInfoRes getNftInfo(Long nftSeq);
}
