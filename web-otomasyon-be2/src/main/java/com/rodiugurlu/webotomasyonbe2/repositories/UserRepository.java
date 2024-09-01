package com.rodiugurlu.webotomasyonbe2.repositories;

import com.rodiugurlu.webotomasyonbe2.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, String> {
    User findByUsernameAndPassword(String username, String password);

}
