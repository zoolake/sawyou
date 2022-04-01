package com.sawyou.db.repository;

import com.sawyou.db.entity.NFT;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface NFTRepository extends JpaRepository<NFT, Long> {

    @Override
    List<NFT> findAll();

    List<NFT> findByUser_UserId(String userId);

    Optional<NFT> findByNftSeq(Long nftSeq);
}
