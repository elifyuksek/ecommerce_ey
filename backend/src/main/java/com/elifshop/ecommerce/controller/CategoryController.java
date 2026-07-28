package com.elifshop.ecommerce.controller;

import com.elifshop.ecommerce.entity.Category;
import com.elifshop.ecommerce.repository.CategoryRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/categories")
public class CategoryController {
    private final CategoryRepository categoryRepository;

    public CategoryController(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @GetMapping
    public List<Category> getCategories() {
        return categoryRepository.findAll();
    }
}
