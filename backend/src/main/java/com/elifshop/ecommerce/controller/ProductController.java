package com.elifshop.ecommerce.controller;

import com.elifshop.ecommerce.entity.Product;
import com.elifshop.ecommerce.repository.ProductRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/products")
public class ProductController {
    private final ProductRepository productRepository;

    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @GetMapping
    public Map<String, Object> getProducts(
            @RequestParam(required = false) Long category,
            @RequestParam(required = false) String filter,
            @RequestParam(required = false) String sort,
            @RequestParam(defaultValue = "25") int limit,
            @RequestParam(defaultValue = "0") int offset) {
        List<Product> products = productRepository.findAll().stream()
                .filter(product -> category == null || category.equals(product.getCategoryId()))
                .filter(product -> filter == null || filter.isBlank() || matches(product, filter))
                .sorted(comparator(sort))
                .toList();

        int start = Math.max(0, Math.min(offset, products.size()));
        int end = Math.min(start + Math.max(0, limit), products.size());
        Map<String, Object> response = new HashMap<>();
        response.put("products", products.subList(start, end));
        response.put("total", products.size());
        return response;
    }

    @GetMapping("/{id}")
    public Product getProduct(@PathVariable Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found"));
    }

    private boolean matches(Product product, String filter) {
        String search = filter.toLowerCase();
        return (product.getName() + " " + product.getDescription()).toLowerCase().contains(search);
    }

    private Comparator<Product> comparator(String sort) {
        if (sort == null || sort.isBlank()) return Comparator.comparing(Product::getId);
        String[] parts = sort.split(":");
        Comparator<Product> comparator = switch (parts[0]) {
            case "price" -> Comparator.comparing(Product::getPrice);
            case "rating" -> Comparator.comparing(Product::getRating);
            default -> Comparator.comparing(Product::getId);
        };
        return parts.length > 1 && "desc".equals(parts[1]) ? comparator.reversed() : comparator;
    }
}
