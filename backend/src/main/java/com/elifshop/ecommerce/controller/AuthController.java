package com.elifshop.ecommerce.controller;

import com.elifshop.ecommerce.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.elifshop.ecommerce.entity.User;
import com.elifshop.ecommerce.repository.UserRepository;
import java.util.UUID;

import java.util.Map;

@RestController
@RequestMapping
public class AuthController {
    private final AuthService authService;
    private final UserRepository userRepository;

    public AuthController(AuthService authService, UserRepository userRepository) {
        this.authService = authService;
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> credentials) {
        return ResponseEntity.ok(authService.login(credentials.get("email"), credentials.get("password")));
    }

    @GetMapping("/verify")
    public ResponseEntity<Map<String, Object>> verify(@RequestHeader("Authorization") String token) {
        return ResponseEntity.ok(authService.verify(token));
    }

    @PostMapping("/signup")
    public ResponseEntity<Map<String, String>> signup(@RequestBody Map<String, Object> payload) {
        if (userRepository.findByEmail(String.valueOf(payload.get("email"))).isPresent()) {
            return ResponseEntity.status(409).body(Map.of("message", "Email already exists"));
        }
        User user = new User();
        user.setId(UUID.randomUUID().toString());
        user.setName(String.valueOf(payload.get("name")));
        user.setEmail(String.valueOf(payload.get("email")));
        user.setPassword(String.valueOf(payload.get("password")));
        user.setRoleId(String.valueOf(payload.getOrDefault("role_id", "3")));
        userRepository.save(user);
        return ResponseEntity.status(201).body(Map.of("message", "Account created"));
    }
}
