package com.shopsphere.repository;

import com.shopsphere.entity.SellerProfile;
import com.shopsphere.enums.SellerStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SellerProfileRepository extends JpaRepository<SellerProfile, Long> {

    Optional<SellerProfile> findByUserId(Long userId);

    Page<SellerProfile> findByStatus(SellerStatus status, Pageable pageable);

    Boolean existsByUserId(Long userId);
}
