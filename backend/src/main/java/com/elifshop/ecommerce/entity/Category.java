package com.elifshop.ecommerce.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.math.BigDecimal;

@Entity
@Table(name = "categories")
public class Category {
    @Id
    private Long id;
    private String code;
    private String title;
    private String img;
    private BigDecimal rating;
    private String gender;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getImg() { return img; }
    public void setImg(String img) { this.img = img; }
    public BigDecimal getRating() { return rating; }
    public void setRating(BigDecimal rating) { this.rating = rating; }
    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }
}
