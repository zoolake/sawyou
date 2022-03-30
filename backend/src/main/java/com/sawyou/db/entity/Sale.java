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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "nft_seq")
    private NFT nft;

    private Long salePrice;
    private String saleStartDate;
    private String saleEndDate;
    private String saleContractAddress;
    private Boolean isSold;
}
