package com.sawyou.api.service;

import com.sawyou.api.response.NftOnSaleDetailRes;
import com.sawyou.api.response.NftOnSaleRes;
import com.sawyou.db.entity.Sale;
import com.sawyou.db.repository.NFTRepository;
import com.sawyou.db.repository.SaleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    public List<NftOnSaleRes> getOnSaleList (){
        List<NftOnSaleRes> sale = saleRepository.findByIsSold(true).stream()
                .map(Sale -> new NftOnSaleRes(Sale))
                .collect(Collectors.toList());
        return sale;
    }


    //  판매여부를 확인하여 판매중인 sale 정보를 가져온다.
//  sale정보를 통해 NftOnSaleRes를 완성시킨다.
    public NftOnSaleDetailRes getOnSale (Long nftSeq){
        NftOnSaleDetailRes sale = new NftOnSaleDetailRes(saleRepository.findByNftNftSeqAndIsSold(nftSeq,true));
        return sale;
    }




}
