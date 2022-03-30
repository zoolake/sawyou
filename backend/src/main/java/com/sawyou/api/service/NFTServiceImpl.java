package com.sawyou.api.service;

import com.sawyou.api.request.NftSaleReq;
import com.sawyou.api.response.NftListRes;
import com.sawyou.api.response.NftOnSaleDetailRes;
import com.sawyou.api.response.NftOnSaleRes;
import com.sawyou.db.entity.NFT;
import com.sawyou.db.entity.Sale;
import com.sawyou.db.repository.NFTRepository;
import com.sawyou.db.repository.SaleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * NFT 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("NFTService")
public class NFTServiceImpl implements NFTService {
    @Autowired
    private NFTRepository nftRepository;
    @Autowired
    private SaleRepository saleRepository;

    /**
     * 판매중인 NFT 조회
     * 판매여부를 확인하여 판매중인 sale 정보를 가져온다.
     * written by 정혁
     */
    public List<NftOnSaleRes> getOnSaleList() {
        List<NftOnSaleRes> sale = saleRepository.findByIsSold(true).stream()
                .map(Sale -> new NftOnSaleRes(Sale))
                .collect(Collectors.toList());
        return sale;
    }

    /**
     * 유저가 보유한 NFT 내역 조회
     * 직접 게시글에서 민팅한 NFT(단, 판매가 되지 않은) + 구매한 NFT
     * written by 문준호
     */
    @Override
    @Transactional(readOnly = true)
    public List<NftListRes> getNftList(Long userSeq) {
        List<NFT> nftList = nftRepository.findByUser_UserSeq(userSeq);
        return nftList.stream()
                .map(nft -> new NftListRes(nft.getNftSeq(), nft.getNftPictureLink()))
                .collect(Collectors.toList());
    }

    /**
     * 판매중인 NFT 상세조회
     * 판매여부를 확인하여 해당 NFT를 조회한다.
     * written by 정혁
     */
    public NftOnSaleDetailRes getOnSale (Long nftSeq){
        NftOnSaleDetailRes sale = new NftOnSaleDetailRes(saleRepository.findByNftNftSeqAndIsSold(nftSeq,true));
        return sale;
    }

    /**
     * NFT 판매
     * NFT 판매 관련정보를 입력하고 판매한다.
     * written by 정혁
     */
    @Transactional
    public Sale sale (NftSaleReq nftSaleReq){
        Sale sale = Sale
                .builder()
                .saleContractAddress(nftSaleReq.getSaleContractAddress())
                .saleStartDate(nftSaleReq.getSaleStartDate())
                .saleEndDate(nftSaleReq.getSaleStartDate())
                .salePrice(nftSaleReq.getSalePrice())
                .isSold(true)
                .nft(NFT.builder()
                        .nftSeq(nftSaleReq.getNftSeq())
                        .build())
                .build();
        saleRepository.save(sale);
        return sale;
    }



}
