package com.sawyou.api.service;

import com.sawyou.api.response.NftInfoRes;
import com.sawyou.api.response.NftListRes;
import com.sawyou.api.response.NftOnSaleDetailRes;
import com.sawyou.api.response.NftOnSaleRes;
import com.sawyou.db.entity.NFT;
import com.sawyou.db.entity.User;
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

    //  판매여부를 확인하여 판매중인 sale 정보를 가져온다.
    //  sale정보를 통해 NftOnSaleRes를 완성시킨다.
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

    //  판매여부를 확인하여 판매중인 sale 정보를 가져온다.
    //  sale정보를 통해 NftOnSaleRes를 완성시킨다.
    public NftOnSaleDetailRes getOnSale (Long nftSeq) {
        NftOnSaleDetailRes sale = new NftOnSaleDetailRes(saleRepository.findByNftNftSeqAndIsSold(nftSeq, true));
        return sale;
    }

    /**
     * NFT 상세 조회
     * written by 문준호
     */
    @Override
    @Transactional(readOnly = true)
    public NftInfoRes getNftInfo(Long nftSeq) {
        NFT nft = nftRepository.findByNftSeq(nftSeq);
        User user = nft.getUser();
        return NftInfoRes.builder()
                .userSeq(user.getUserSeq())
                .nftOwnerAddress(nft.getNftOwnerAddress())
                .nftOwnerName(user.getUserName())
                .nftPictureLink(nft.getNftPictureLink())
                .nftAuthorName(nft.getNftAuthorName())
                .nftTitle(nft.getNftTitle())
                .nftDesc(nft.getNftAuthorName())
                .nftTokenId(nft.getNftTokenId())
                .nftCreateAt(nft.getNftCreatedAt())
                .build();
    }

}
