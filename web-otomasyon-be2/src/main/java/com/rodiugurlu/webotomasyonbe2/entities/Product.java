package com.rodiugurlu.webotomasyonbe2.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "marka")
    private String marka;

    @Column(name = "urunadi")
    private String urunadi;

    @Column(name = "alisfiyat")
    private double alisfiyat;

    @Column(name = "satisfiyat")
    private double satisfiyat;

    @Column(name = "stok")
    private int stok;
}