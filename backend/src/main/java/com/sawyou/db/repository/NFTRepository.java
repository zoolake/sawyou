package com.sawyou.db.repository;

import com.sawyou.db.entity.NFT;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NFTRepository extends JpaRepository<NFT,Long> {

    @Override
    List<NFT> findAll();
}
