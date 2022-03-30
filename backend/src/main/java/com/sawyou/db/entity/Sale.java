package com.sawyou.db.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Sale {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long saleSeq;
    /**
     * <수정>
     * NFT와의 관계를 N:1 관계로 수정
     * 같은 NFT를 서로다른 사람이 팔 수 있기 때문이다.
     * written by 김정혁
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "nft_seq")
    private NFT nft;
    private Long salePrice;
    private String saleStartDate;
    private String saleEndDate;
    private String saleContractAddress;
    private Boolean isSold;
}
