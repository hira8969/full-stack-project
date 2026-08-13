package com.shopsphere.config;

import com.shopsphere.entity.*;
import com.shopsphere.enums.RoleName;
import com.shopsphere.enums.SellerStatus;
import com.shopsphere.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final CategoryRepository categoryRepository;
    private final InventoryRepository inventoryRepository;
    private final ProductRepository productRepository;
    private final RoleRepository roleRepository;
    private final SellerProfileRepository sellerProfileRepository;
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    @Transactional
    public void run(String... args) {
        roleRepository.findByName(RoleName.ROLE_CUSTOMER).orElseGet(() -> roleRepository.save(Role.builder().name(RoleName.ROLE_CUSTOMER).build()));
        roleRepository.findByName(RoleName.ROLE_SELLER).orElseGet(() -> roleRepository.save(Role.builder().name(RoleName.ROLE_SELLER).build()));

        User sellerUser = userRepository.findByEmail("seller@shopsphere.local").orElseGet(() ->
                userRepository.save(User.builder()
                        .email("seller@shopsphere.local")
                        .password(passwordEncoder.encode("password123"))
                        .firstName("ShopSphere")
                        .lastName("Seller")
                        .phone("+91 90000 00000")
                        .enabled(true)
                        .build()));

        SellerProfile seller = sellerProfileRepository.findByUserId(sellerUser.getId()).orElseGet(() ->
                sellerProfileRepository.save(SellerProfile.builder()
                        .user(sellerUser)
                        .storeName("ShopSphere Direct")
                        .businessEmail("seller@shopsphere.local")
                        .businessPhone("+91 90000 00000")
                        .description("Official seeded seller for demo products")
                        .status(SellerStatus.APPROVED)
                        .build()));

        List<SeedProduct> products = List.of(
                new SeedProduct("SS-SHOE-001", "AeroRun Pro Sneakers", "StrideX", "Footwear", "footwear", "Responsive running sneakers with breathable mesh and cushioned sole.", "Black", "8", 3499, 2899, "4.60", 842, 28, "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80"),
                new SeedProduct("SS-BAG-002", "Nimbus Work Backpack", "CarryLab", "Accessories", "accessories", "Weather-ready backpack with laptop storage and daily organization pockets.", "Graphite", "20L", 2599, null, "4.40", 319, 14, "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=900&q=80"),
                new SeedProduct("SS-AUDIO-003", "Pulse Wireless Headphones", "SoundArc", "Electronics", "electronics", "Wireless over-ear headphones with rich bass and long battery life.", "Ivory", "One size", 5999, 4299, "4.80", 1204, 7, "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80"),
                new SeedProduct("SS-WATCH-004", "Orbit Smart Watch", "ChronoFit", "Wearables", "wearables", "AMOLED smart watch with health tracking, GPS, and fast charging.", "Midnight", "44mm", 7999, 6499, "4.70", 901, 21, "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80"),
                new SeedProduct("SS-HOME-005", "BrewMate Coffee Maker", "HomeBrew", "Home", "home", "Compact coffee maker for fresh brews at home or office.", "Steel", "1.2L", 4999, 3799, "4.50", 438, 18, "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=900&q=80"),
                new SeedProduct("SS-LAMP-006", "Luma Desk Lamp", "GlowHaus", "Home", "home", "Adjustable LED desk lamp with soft lighting modes.", "White", "Medium", 2199, null, "4.30", 267, 33, "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80"),
                new SeedProduct("SS-FIT-007", "Flex Yoga Mat", "ZenFlex", "Fitness", "fitness", "Non-slip yoga mat with comfortable cushioning for daily workouts.", "Sage", "6mm", 1899, 1399, "4.60", 514, 45, "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?auto=format&fit=crop&w=900&q=80"),
                new SeedProduct("SS-GLASS-008", "Clarity Sunglasses", "Vista", "Accessories", "accessories", "Lightweight polarized sunglasses with a clean everyday frame.", "Amber", "One size", 2499, null, "4.20", 190, 26, "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=80")
        );

        for (SeedProduct seed : products) {
            Category category = categoryRepository.findBySlug(seed.categorySlug()).orElseGet(() ->
                    categoryRepository.save(Category.builder()
                            .name(seed.categoryName())
                            .slug(seed.categorySlug())
                            .description(seed.categoryName() + " products")
                            .active(true)
                            .build()));

            if (productRepository.existsBySku(seed.sku())) {
                continue;
            }

            Product product = Product.builder()
                    .title(seed.title())
                    .sku(seed.sku())
                    .description(seed.description())
                    .price(BigDecimal.valueOf(seed.price()))
                    .discountPrice(seed.discountPrice() == null ? null : BigDecimal.valueOf(seed.discountPrice()))
                    .brand(seed.brand())
                    .color(seed.color())
                    .size(seed.size())
                    .category(category)
                    .sellerProfile(seller)
                    .averageRating(new BigDecimal(seed.rating()))
                    .reviewCount(seed.reviewCount())
                    .active(true)
                    .build();
            ProductImage image = ProductImage.builder()
                    .product(product)
                    .imageUrl(seed.imageUrl())
                    .isPrimary(true)
                    .displayOrder(0)
                    .build();
            product.getImages().add(image);
            product = productRepository.save(product);

            Inventory inventory = Inventory.builder()
                    .product(product)
                    .availableQuantity(seed.stock())
                    .reservedQuantity(0)
                    .soldQuantity(0)
                    .build();
            inventoryRepository.save(inventory);
            product.setInventory(inventory);
        }
    }

    private record SeedProduct(
            String sku,
            String title,
            String brand,
            String categoryName,
            String categorySlug,
            String description,
            String color,
            String size,
            int price,
            Integer discountPrice,
            String rating,
            int reviewCount,
            int stock,
            String imageUrl
    ) {
    }
}
