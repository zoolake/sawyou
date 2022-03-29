package com.sawyou.db.repository;

import com.sawyou.db.entity.Sale;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SaleRepository extends JpaRepository<Sale,Long> {
    List<Sale> findByIsSold(Boolean isSold);
}
