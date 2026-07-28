package com.elifshop.ecommerce.controller;

import com.elifshop.ecommerce.entity.User;
import com.elifshop.ecommerce.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/user")
public class UserDataController {
    private final AuthService authService;
    private final Map<String, List<Map<String, Object>>> addresses = new ConcurrentHashMap<>();
    private final Map<String, List<Map<String, Object>>> cards = new ConcurrentHashMap<>();

    public UserDataController(AuthService authService) {
        this.authService = authService;
    }

    @GetMapping("/address")
    public List<Map<String, Object>> getAddresses(@RequestHeader("Authorization") String token) {
        return collection(addresses, authService.getUser(token));
    }

    @PostMapping("/address")
    public ResponseEntity<Map<String, Object>> addAddress(@RequestHeader("Authorization") String token, @RequestBody Map<String, Object> body) {
        return ResponseEntity.status(HttpStatus.CREATED).body(add(addresses, authService.getUser(token), body));
    }

    @PutMapping("/address")
    public Map<String, Object> updateAddress(@RequestHeader("Authorization") String token, @RequestBody Map<String, Object> body) {
        return update(addresses, authService.getUser(token), body);
    }

    @DeleteMapping("/address/{id}")
    public ResponseEntity<Void> deleteAddress(@RequestHeader("Authorization") String token, @PathVariable String id) {
        delete(addresses, authService.getUser(token), id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/card")
    public List<Map<String, Object>> getCards(@RequestHeader("Authorization") String token) {
        return collection(cards, authService.getUser(token));
    }

    @PostMapping("/card")
    public ResponseEntity<Map<String, Object>> addCard(@RequestHeader("Authorization") String token, @RequestBody Map<String, Object> body) {
        return ResponseEntity.status(HttpStatus.CREATED).body(add(cards, authService.getUser(token), body));
    }

    @PutMapping("/card")
    public Map<String, Object> updateCard(@RequestHeader("Authorization") String token, @RequestBody Map<String, Object> body) {
        return update(cards, authService.getUser(token), body);
    }

    @DeleteMapping("/card/{id}")
    public ResponseEntity<Void> deleteCard(@RequestHeader("Authorization") String token, @PathVariable String id) {
        delete(cards, authService.getUser(token), id);
        return ResponseEntity.noContent().build();
    }

    private List<Map<String, Object>> collection(Map<String, List<Map<String, Object>>> store, User user) {
        return store.computeIfAbsent(user.getId(), ignored -> new ArrayList<>());
    }

    private Map<String, Object> add(Map<String, List<Map<String, Object>>> store, User user, Map<String, Object> body) {
        Map<String, Object> record = new HashMap<>(body);
        record.put("id", UUID.randomUUID().toString());
        collection(store, user).add(record);
        return record;
    }

    private Map<String, Object> update(Map<String, List<Map<String, Object>>> store, User user, Map<String, Object> body) {
        List<Map<String, Object>> records = collection(store, user);
        String id = String.valueOf(body.get("id"));
        for (int index = 0; index < records.size(); index++) {
            if (String.valueOf(records.get(index).get("id")).equals(id)) {
                records.set(index, new HashMap<>(body));
                return records.get(index);
            }
        }
        return add(store, user, body);
    }

    private void delete(Map<String, List<Map<String, Object>>> store, User user, String id) {
        collection(store, user).removeIf(record -> String.valueOf(record.get("id")).equals(id));
    }
}
