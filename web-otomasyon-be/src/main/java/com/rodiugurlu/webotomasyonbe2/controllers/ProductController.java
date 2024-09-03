package com.rodiugurlu.webotomasyonbe2.controllers;

import com.rodiugurlu.webotomasyonbe2.entities.Product;
import com.rodiugurlu.webotomasyonbe2.repositories.ProductRepository;
import com.rodiugurlu.webotomasyonbe2.services.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Period;
import java.util.List;

@RestController
@RequestMapping("/api/products")
@AllArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ProductController {
private final ProductService productService;
    private ProductRepository productRepository;

    @GetMapping
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable int id) {
        try {
            productRepository.deleteById(id);
            return ResponseEntity.ok("Ürün başarıyla silindi.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Ürün silinirken bir hata oluştu.");
        }
    }
    @GetMapping("/query")
    public List<Product> queryProducts(@RequestParam String urunadi) {
        return productRepository.urunAdinaGoreBul(urunadi);
    }
    @PutMapping("/updateProduct")
    public ResponseEntity<Product> updateProduct(@RequestBody Product product){
        Product updatedProduct=productService.updateProduct(product);
        return ResponseEntity.ok(updatedProduct);
    }
    @PostMapping("/addProduct")
    public ResponseEntity<Product> addProduct(@RequestBody Product product){
         productRepository.save(product);
         return ResponseEntity.ok(product);
    }
}

