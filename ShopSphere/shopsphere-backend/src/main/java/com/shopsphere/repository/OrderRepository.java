package com.shopsphere.repository;

import com.shopsphere.entity.Order;
import com.shopsphere.enums.OrderStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    Optional<Order> findByOrderNumber(String orderNumber);

    Page<Order> findByCustomerId(Long customerId, Pageable pageable);

    Page<Order> findByStatus(OrderStatus status, Pageable pageable);

    @Query("SELECT DISTINCT o FROM Order o JOIN o.items item WHERE item.sellerProfile.id = :sellerProfileId")
    Page<Order> findBySellerProfileId(@Param("sellerProfileId") Long sellerProfileId, Pageable pageable);

    @Query("SELECT COUNT(o) FROM Order o WHERE o.customer.id = :customerId AND EXISTS (SELECT item FROM OrderItem item WHERE item.order = o AND item.product.id = :productId) AND o.status = 'DELIVERED'")
    Long countDeliveredOrdersByCustomerAndProduct(@Param("customerId") Long customerId, @Param("productId") Long productId);

    @Query("SELECT COALESCE(SUM(o.totalAmount), 0) FROM Order o WHERE o.status = 'DELIVERED'")
    BigDecimal calculateTotalPlatformRevenue();
}
