package com.shopsphere.dto.product;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductSearchFilter {

    private String keyword;
    private Long categoryId;
    private String brand;
    private String color;
    private String size;
    private BigDecimal minPrice;
    private BigDecimal maxPrice;
    private BigDecimal minRating;
    private Boolean inStockOnly = false;

    // Pagination & Sorting
    private int page = 0;
    private int pageSize = 20;
    private String sortBy = "createdAt";
    private String sortDir = "desc";
}
