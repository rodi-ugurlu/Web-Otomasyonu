package com.rodiugurlu.webotomasyonbe2.controllers;

import com.rodiugurlu.webotomasyonbe2.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@AllArgsConstructor
@CrossOrigin("*")
public class UserController {
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<Map<String, Boolean>> login(@RequestBody Map<String, String> formData) {

        String username = formData.get("username");
        String password = formData.get("password");

        boolean isAuthenticated = userService.authenticate(username, password);

        Map<String, Boolean> response = new HashMap<>();
        response.put("success", isAuthenticated);

        if (isAuthenticated) {

            return ResponseEntity.ok(response);

        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }
}
