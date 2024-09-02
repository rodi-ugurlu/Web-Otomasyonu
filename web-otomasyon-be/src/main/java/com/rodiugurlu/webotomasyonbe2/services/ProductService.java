package com.rodiugurlu.webotomasyonbe2.services;

import com.rodiugurlu.webotomasyonbe2.entities.Product;
import org.springframework.http.ResponseEntity;

public interface ProductService  {
    Product updateProduct(Product product);
}
