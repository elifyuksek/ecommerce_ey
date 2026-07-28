package com.elifshop.ecommerce.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/roles")
public class RoleController {
    @GetMapping
    public List<Map<String, Object>> getRoles() {
        return List.of(
                Map.of("id", 1, "name", "Yönetici", "code", "admin"),
                Map.of("id", 2, "name", "Mağaza", "code", "store"),
                Map.of("id", 3, "name", "Müşteri", "code", "customer")
        );
    }
}
