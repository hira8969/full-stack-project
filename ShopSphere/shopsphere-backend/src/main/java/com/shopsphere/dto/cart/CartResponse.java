package com.shopsphere.dto.cart;

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
public class CartResponse {

    private Long id;
    private Long userId;
    private List<CartItemResponse> items;
    private BigDecimal totalAmount;
    private Integer totalItems;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class CartItemResponse {
        private Long id;
        private Long productId;
        private String productTitle;
        private String productSku;
        private String imageUrl;
        private Integer quantity;
        private BigDecimal unitPrice;
        private BigDecimal subTotal;
        private Integer availableStock;
    }
}
