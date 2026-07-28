package com.elifshop.ecommerce.controller;

import com.elifshop.ecommerce.entity.User;
import com.elifshop.ecommerce.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/order")
public class OrderController {
    private final AuthService authService;
    private final Map<String, List<Map<String, Object>>> orders = new ConcurrentHashMap<>();

    public OrderController(AuthService authService) {
        this.authService = authService;
    }

    @GetMapping
    public List<Map<String, Object>> getOrders(@RequestHeader("Authorization") String token) {
        return orders.computeIfAbsent(authService.getUser(token).getId(), ignored -> new ArrayList<>());
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> createOrder(@RequestHeader("Authorization") String token,
                                                            @RequestBody Map<String, Object> body) {
        User user = authService.getUser(token);
        Map<String, Object> order = new HashMap<>(body);
        order.put("id", UUID.randomUUID().toString());
        order.put("user_id", user.getId());
        order.put("order_date", Instant.now().toString());
        orders.computeIfAbsent(user.getId(), ignored -> new ArrayList<>()).add(order);
        return ResponseEntity.status(HttpStatus.CREATED).body(order);
    }
}
