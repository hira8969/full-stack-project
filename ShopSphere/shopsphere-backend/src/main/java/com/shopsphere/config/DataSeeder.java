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
                new SeedProduct("SS-GLASS-008", "Clarity Sunglasses", "Vista", "Accessories", "accessories", "Lightweight polarized sunglasses with a clean everyday frame.", "Amber", "One size", 2499, null, "4.20", 190, 26, "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=80"),
                new SeedProduct("SS-PHONE-009", "Nova X5 Smartphone", "Mobix", "Electronics", "electronics", "5G smartphone with crisp display, triple camera, and all-day battery.", "Blue", "128GB", 24999, 21999, "4.50", 721, 16, "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80"),
                new SeedProduct("SS-LAP-010", "EdgeBook Air Laptop", "TechNova", "Electronics", "electronics", "Lightweight productivity laptop with fast SSD storage and slim metal body.", "Silver", "14 inch", 58999, 52999, "4.70", 356, 9, "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80"),
                new SeedProduct("SS-CAM-011", "Focus Mini Camera", "Pixora", "Electronics", "electronics", "Compact mirrorless camera for creators, travel, and everyday shoots.", "Black", "24MP", 42999, 38999, "4.40", 184, 11, "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80"),
                new SeedProduct("SS-TEE-012", "Cloud Cotton T-Shirt", "UrbanThread", "Fashion", "fashion", "Soft cotton everyday t-shirt with breathable relaxed fit.", "Olive", "M", 999, 749, "4.20", 642, 80, "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80"),
                new SeedProduct("SS-JACKET-013", "Trail Lite Jacket", "NorthPeak", "Fashion", "fashion", "Lightweight water-resistant jacket for city rides and weekend trails.", "Navy", "L", 3999, 3199, "4.60", 275, 24, "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=900&q=80"),
                new SeedProduct("SS-DRESS-014", "Aura Summer Dress", "ModeLane", "Fashion", "fashion", "Flowy printed dress made for warm days and easy styling.", "Coral", "S", 2799, 2299, "4.30", 198, 19, "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80"),
                new SeedProduct("SS-BOTTLE-015", "HydroSteel Bottle", "SipWell", "Fitness", "fitness", "Insulated stainless steel bottle that keeps drinks cold or hot for hours.", "Teal", "750ml", 1299, 999, "4.80", 1034, 64, "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=80"),
                new SeedProduct("SS-DUMBBELL-016", "CoreFit Dumbbell Set", "CoreFit", "Fitness", "fitness", "Adjustable dumbbell pair for home strength training.", "Black", "20kg", 6999, 5999, "4.50", 312, 13, "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=900&q=80"),
                new SeedProduct("SS-MIXER-017", "KitchenPro Mixer Grinder", "KitchenPro", "Home", "home", "Powerful mixer grinder with stainless steel jars for daily cooking.", "Red", "750W", 4499, 3499, "4.40", 583, 22, "https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=900&q=80"),
                new SeedProduct("SS-CHAIR-018", "ErgoFlex Office Chair", "SeatCraft", "Furniture", "furniture", "Ergonomic office chair with lumbar support and breathable mesh back.", "Black", "Standard", 10999, 8999, "4.60", 429, 17, "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&w=900&q=80"),
                new SeedProduct("SS-TABLE-019", "Nordic Coffee Table", "Woodora", "Furniture", "furniture", "Minimal coffee table with warm wood finish and sturdy build.", "Walnut", "Medium", 7999, 6999, "4.30", 146, 8, "https://images.unsplash.com/photo-1499933374294-4584851497cc?auto=format&fit=crop&w=900&q=80"),
                new SeedProduct("SS-SKIN-020", "GlowCare Face Serum", "GlowCare", "Beauty", "beauty", "Lightweight hydrating serum with a smooth non-sticky finish.", "Clear", "30ml", 1499, 1199, "4.50", 768, 52, "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=80"),
                new SeedProduct("SS-PERFUME-021", "Mist Oud Perfume", "AromaMist", "Beauty", "beauty", "Long-lasting fragrance with warm oud, spice, and soft amber notes.", "Amber", "100ml", 2999, 2499, "4.40", 331, 28, "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=80"),
                new SeedProduct("SS-BOOK-022", "Deep Work Notebook", "PaperMint", "Stationery", "stationery", "Premium dotted notebook for planning, notes, and daily journaling.", "Cream", "A5", 799, 599, "4.70", 412, 90, "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=900&q=80"),
                new SeedProduct("SS-PEN-023", "Metro Roller Pen", "PaperMint", "Stationery", "stationery", "Smooth roller pen with a balanced metal body and refillable cartridge.", "Black", "0.5mm", 499, null, "4.20", 221, 120, "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=900&q=80"),
                new SeedProduct("SS-TOY-024", "Builder Blocks Set", "PlayNest", "Toys", "toys", "Creative block set for kids with bright pieces and storage box.", "Multicolor", "250 pcs", 1999, 1599, "4.60", 529, 35, "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=900&q=80")
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
