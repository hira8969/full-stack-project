package com.shopsphere.dto.product;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductResponse {

    private Long id;
    private String title;
    private String sku;
    private String description;
    private BigDecimal price;
    private BigDecimal discountPrice;
    private String brand;
    private String color;
    private String size;
    private Long categoryId;
    private String categoryName;
    private Long sellerId;
    private String sellerStoreName;
    private Integer availableQuantity;
    private List<String> imageUrls;
    private BigDecimal averageRating;
    private Integer reviewCount;
    private Boolean active;
}
