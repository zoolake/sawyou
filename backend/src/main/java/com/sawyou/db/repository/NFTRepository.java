package com.sawyou.db.repository;

import com.sawyou.db.entity.NFT;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface NFTRepository extends JpaRepository<NFT, Long> {

    @Override
    List<NFT> findAll();

    List<NFT> findByUser_UserId(String userId);

    // NFT 테이블에서 userID와 일치하며 동시에 Sale 테이블에서 is_sold가 false인
    @Query("select n from NFT n join n.sale s where n.user.userId = :userId and s.isSold = false")
    List<NFT> findUserSaleNft(@Param("userId") String userId);

    Optional<NFT> findByNftSeq(Long nftSeq);
}
