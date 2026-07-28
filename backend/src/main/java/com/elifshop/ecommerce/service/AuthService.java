package com.elifshop.ecommerce.service;

import com.elifshop.ecommerce.entity.User;
import com.elifshop.ecommerce.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final Map<String, String> sessions = new ConcurrentHashMap<>();

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Map<String, Object> login(String email, String password) {
        User user = userRepository.findByEmail(email)
                .filter(item -> item.getPassword().equals(password))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password!"));

        String token = "local-" + UUID.randomUUID();
        sessions.put(token, user.getId());
        return publicUser(user, token);
    }

    public Map<String, Object> verify(String token) {
        User user = getUser(token);
        return publicUser(user, token);
    }

    public User getUser(String token) {
        String userId = sessions.get(token);
        if (userId == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User is not verified");
        }
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User is not verified"));
    }

    private Map<String, Object> publicUser(User user, String token) {
        return Map.of(
                "id", user.getId(),
                "name", user.getName(),
                "email", user.getEmail(),
                "role_id", user.getRoleId(),
                "token", token
        );
    }
}
