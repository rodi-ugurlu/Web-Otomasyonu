package com.rodiugurlu.webotomasyonbe2;

import jakarta.annotation.PostConstruct;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.sql.DataSource;

@SpringBootApplication
public class WebOtomasyonBe2Application {

    @Autowired
    DataSource dataSource;

    public static void main(String[] args) {
        SpringApplication.run(WebOtomasyonBe2Application.class, args);
    }



}
