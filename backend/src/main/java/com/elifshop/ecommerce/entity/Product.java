package com.elifshop.ecommerce.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Entity
@Table(name = "products")
public class Product {
    @Id
    private Long id;
    private String name;
    private String description;
    private BigDecimal price;
    private Integer stock;
    @JsonProperty("store_id")
    private Integer storeId;
    @JsonProperty("category_id")
    private Long categoryId;
    private BigDecimal rating;
    @JsonProperty("sell_count")
    private Integer sellCount;
    @JsonIgnore
    private String imageUrl;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }
    public Integer getStock() { return stock; }
    public void setStock(Integer stock) { this.stock = stock; }
    public Integer getStoreId() { return storeId; }
    public void setStoreId(Integer storeId) { this.storeId = storeId; }
    public Long getCategoryId() { return categoryId; }
    public void setCategoryId(Long categoryId) { this.categoryId = categoryId; }
    public BigDecimal getRating() { return rating; }
    public void setRating(BigDecimal rating) { this.rating = rating; }
    public Integer getSellCount() { return sellCount; }
    public void setSellCount(Integer sellCount) { this.sellCount = sellCount; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public List<Map<String, Object>> getImages() {
        if (imageUrl == null || imageUrl.isBlank()) return List.of();
        return List.of(Map.of("url", imageUrl, "index", 0));
    }
}
