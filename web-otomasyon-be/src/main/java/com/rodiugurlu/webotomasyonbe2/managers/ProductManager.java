package com.rodiugurlu.webotomasyonbe2.managers;

import com.rodiugurlu.webotomasyonbe2.entities.Product;
import com.rodiugurlu.webotomasyonbe2.repositories.ProductRepository;
import com.rodiugurlu.webotomasyonbe2.services.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
@Service
@AllArgsConstructor
public class ProductManager implements ProductService {

    ProductRepository productRepository;

    @Override
    @Transactional
    public Product updateProduct(Product product) {
        Product guncellencekUrun = productRepository.findById(product.getId()).orElseThrow();
        guncellencekUrun.setMarka(product.getMarka());
        guncellencekUrun.setUrunadi(product.getUrunadi());
        guncellencekUrun.setAlisfiyat(product.getAlisfiyat());
        guncellencekUrun.setSatisfiyat(product.getSatisfiyat());
        guncellencekUrun.setStok(product.getStok());
        return productRepository.save(guncellencekUrun);
    }
}
