package com.elifshop.ecommerce.service;

import com.elifshop.ecommerce.entity.Category;
import com.elifshop.ecommerce.entity.Product;
import com.elifshop.ecommerce.entity.User;
import com.elifshop.ecommerce.repository.CategoryRepository;
import com.elifshop.ecommerce.repository.ProductRepository;
import com.elifshop.ecommerce.repository.UserRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;

@Component
public class DataImportService implements CommandLineRunner {
    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final ObjectMapper objectMapper;

    public DataImportService(CategoryRepository categoryRepository,
                             ProductRepository productRepository,
                             UserRepository userRepository,
                             ObjectMapper objectMapper) {
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.objectMapper = objectMapper;
    }

    @Override
    public void run(String... args) throws Exception {
        if (categoryRepository.count() > 0 || productRepository.count() > 0 || userRepository.count() > 0) {
            return;
        }

        Path projectData = Path.of("db.json");
        Path backendData = Path.of("..", "db.json");
        Path dataFile = Files.exists(projectData) ? projectData : backendData;

        try (InputStream input = Files.newInputStream(dataFile)) {
            JsonNode root = objectMapper.readTree(input);
            importCategories(root.path("categories"));
            importProducts(root.path("products"));
            importUsers(root.path("login"));
        }
    }

    private void importCategories(JsonNode categories) {
        for (JsonNode item : categories) {
            Category category = new Category();
            category.setId(item.path("id").asLong());
            category.setCode(item.path("code").asText());
            category.setTitle(item.path("title").asText());
            category.setImg(item.path("img").asText());
            category.setRating(decimal(item, "rating"));
            category.setGender(item.path("gender").asText());
            categoryRepository.save(category);
        }
    }

    private void importProducts(JsonNode products) {
        for (JsonNode item : products) {
            Product product = new Product();
            product.setId(item.path("id").asLong());
            product.setName(item.path("name").asText());
            product.setDescription(item.path("description").asText());
            product.setPrice(decimal(item, "price"));
            product.setStock(item.path("stock").asInt());
            product.setStoreId(item.path("store_id").asInt());
            product.setCategoryId(item.path("category_id").asLong());
            product.setRating(decimal(item, "rating"));
            product.setSellCount(item.path("sell_count").asInt());
            JsonNode images = item.path("images");
            if (images.isArray() && images.size() > 0) {
                product.setImageUrl(images.get(0).path("url").asText());
            }
            productRepository.save(product);
        }
    }

    private void importUsers(JsonNode users) {
        for (JsonNode item : users) {
            User user = new User();
            user.setId(item.path("id").asText());
            user.setName(item.path("name").asText());
            user.setEmail(item.path("email").asText());
            user.setPassword(item.path("password").asText());
            user.setRoleId(item.path("role_id").asText());
            userRepository.save(user);
        }
    }

    private BigDecimal decimal(JsonNode item, String field) {
        return item.hasNonNull(field) ? item.get(field).decimalValue() : BigDecimal.ZERO;
    }
}
