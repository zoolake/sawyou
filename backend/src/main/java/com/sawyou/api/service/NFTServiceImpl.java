package com.sawyou.api.service;

import com.sawyou.api.request.NftMintReq;
import com.sawyou.api.request.NftPurchaseReq;
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

import java.time.LocalDateTime;
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
        List<NftOnSaleRes> sale = saleRepository.findByIsSold(false).stream()
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
    public List<NftListRes> getNftList(String userId) {
        List<NFT> nftList = nftRepository.findByUser_UserId(userId);
        if (nftList.isEmpty()) return null;
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
        NftOnSaleDetailRes sale = new NftOnSaleDetailRes(saleRepository.findByNftNftSeqAndIsSold(nftSeq, false));
        return sale;
    }


    /**
     * NFT 판매
     * NFT 판매 관련정보를 입력하고 판매한다.
     * written by 정혁
     */
    @Transactional
    public Sale sale(NftSaleReq nftSaleReq) {
        LocalDateTime now = LocalDateTime.now();
        Sale sale = Sale
                .builder()
                .saleContractAddress(nftSaleReq.getSaleContractAddress())
                .saleStartDate(now)
                .saleEndDate(now.plusDays(3))
                .salePrice(nftSaleReq.getSalePrice())
                .isSold(false)
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

        post.get().setPostIsNft(true);
        return nftRepository.save(request.toEntity(user.get(), post.get()));
    }

    /**
     * NFT 구매
     * written by 김정혁
     * - 구매 성공시 판매 테이블에서 판매여부Y/N을 업데이트 해준다.
     * - tokenID를 활용하여 해당 NFT의 소유자를 변경해준다. (NFT 테이블)
     * - 유저 일련번호 업데이트
     * - 소유자 지갑 주소 업데이트
     */
    @Override
    @Transactional
    public Sale purchase(NftPurchaseReq nftPurchaseReq, Long UserSeq) {
        Long userSeq = UserSeq;
        String owner = nftPurchaseReq.getNftOwnerAddress();
        Long nftSeq = nftPurchaseReq.getNftSeq();

//      판매중인 sale을 조회
        Sale sale = saleRepository.findByNftNftSeqAndIsSold(nftSeq, false);
        NFT nft = nftRepository.findByNftSeq(nftSeq).get();
        User user = userRepository.findByUserSeq(UserSeq).get();

        sale.setIsSold(true);
        nft.setNftOwnerAddress(owner);
        nft.setUser(user);
        sale.setNft(nft);
        return sale;
    }

    /**
     * 유저가 판매중인 NFT 조회
     * userId를 활용하여 해당 유저가 판매중인 NFT 내역을 조회한다.
     * written by 문준호
     */
    @Override
    public List<NftListRes> getUserSaleList(String userId) {

        List<NFT> userSaleNft = nftRepository.findUserSaleNft(userId);
        if (userSaleNft.isEmpty()) return null;
        return userSaleNft.stream()
                .map(nft -> new NftListRes(nft.getNftSeq(), nft.getNftPictureLink()))
                .collect(Collectors.toList());
    }


}
