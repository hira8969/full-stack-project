package com.shopsphere.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "wishlist_items", uniqueConstraints = {
        @UniqueConstraint(name = "uk_wishlist_product", columnNames = {"wishlist_id", "product_id"})
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WishlistItem extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "wishlist_id", nullable = false)
    private Wishlist wishlist;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;
}
