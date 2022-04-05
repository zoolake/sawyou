package com.sawyou.api.service;

import com.sawyou.api.request.CancelSaleReq;
import com.sawyou.api.request.NftMintReq;
import com.sawyou.api.request.NftPurchaseReq;
import com.sawyou.api.request.NftSaleReq;
import com.sawyou.api.response.*;
import com.sawyou.db.entity.NFT;
import com.sawyou.db.entity.Sale;
import java.util.List;

/**
 *	NFT 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface NFTService {
    //판매중인 NFT 조회
    List<NftOnSaleRes> getOnSaleList ();
    // 유저가 보유중인 NFT 조회
    List<NftListRes> getNftList(String userId);
    // 판매중인 NFT 상세조회
    NftOnSaleDetailRes getOnSale (Long nftSeq);
    // NFT 판매
    Sale sale (NftSaleReq nftSaleReq);
    // NFT 상세 조회 성공
    NftInfoRes getNftInfo(Long nftSeq);

    // NFT 민팅
    NFT mintNft(NftMintReq request, Long userSeq);
    // NFT 구매
    public Sale purchase(NftPurchaseReq nftPurchaseReq, Long UserSeq);

    // 유저가 판매중인 NFT 조회
    List<NftSaleListRes> getUserSaleList(String userId);

    // 판매중인 NFT 삭제
    Long cancelSale(CancelSaleReq cancelSaleReq);
}
