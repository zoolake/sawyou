package com.sawyou.api.service;

import com.sawyou.api.request.NftMintReq;
import com.sawyou.api.request.NftSaleReq;
import com.sawyou.api.response.NftInfoRes;
import com.sawyou.api.response.NftListRes;
import com.sawyou.api.response.NftOnSaleDetailRes;
import com.sawyou.api.response.NftOnSaleRes;
import com.sawyou.db.entity.NFT;
import com.sawyou.db.entity.Post;
import com.sawyou.db.entity.Sale;
import com.sawyou.db.entity.User;
import com.sawyou.db.repository.NFTRepository;
import com.sawyou.db.repository.PostRepository;
import com.sawyou.db.repository.SaleRepository;
import com.sawyou.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
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
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PostRepository postRepository;

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
    public NftOnSaleDetailRes getOnSale(Long nftSeq) {
        NftOnSaleDetailRes sale = new NftOnSaleDetailRes(saleRepository.findByNftNftSeqAndIsSold(nftSeq, true));
        return sale;
    }


    /**
     * NFT 판매
     * NFT 판매 관련정보를 입력하고 판매한다.
     * written by 정혁
     */
    @Transactional
    public Sale sale(NftSaleReq nftSaleReq) {
        Sale sale = Sale
                .builder()
                .saleContractAddress(nftSaleReq.getSaleContractAddress())
                .saleStartDate(nftSaleReq.getSaleStartDate())
                .saleEndDate(nftSaleReq.getSaleEndDate())
                .salePrice(nftSaleReq.getSalePrice())
                .isSold(true)
                .nft(NFT.builder()
                        .nftSeq(nftSaleReq.getNftSeq())
                        .build())
                .build();
        saleRepository.save(sale);
        return sale;
    }

    /**
     * NFT 상세 조회
     * written by 문준호
     */
    @Override
    @Transactional(readOnly = true)
    public NftInfoRes getNftInfo(Long nftSeq) {
        Optional<NFT> optionalNFT = nftRepository.findByNftSeq(nftSeq);
        if (optionalNFT.isEmpty()) return null;

        NFT nft = optionalNFT.get();
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
                .nftCreateAt(nft.getNftCreatedAt().toString())
                .build();
    }

    /**
     * NFT 민팅
     * written by 문준호
     */
    @Override
    public NFT mintNft(NftMintReq request, Long userSeq) {
        Optional<User> user = userRepository.findByUserSeq(userSeq);
        if (user.isEmpty()) return null;

        Optional<Post> post = postRepository.findById(request.getPostSeq());
        if (post.isEmpty()) return null;

        return nftRepository.save(request.toEntity(user.get(), post.get()));
    }

}
