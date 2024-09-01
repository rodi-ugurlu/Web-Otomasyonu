package com.rodiugurlu.webotomasyonbe2.repositories;

import com.rodiugurlu.webotomasyonbe2.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Integer> {
    @Query("SELECT p FROM Product p WHERE LOWER(p.urunadi) LIKE LOWER(CONCAT('%', :urunadi, '%'))")
    List<Product> urunAdinaGoreBul(@Param("urunadi") String urunadi);
}



