package com.rodiugurlu.webotomasyonbe2.managers;

import com.rodiugurlu.webotomasyonbe2.repositories.UserRepository;
import com.rodiugurlu.webotomasyonbe2.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserManager implements UserService {
private final UserRepository userRepository;
    @Override
    public boolean authenticate(String username, String password) {
        return userRepository.findByUsernameAndPassword(username, password) != null;

    }
}
