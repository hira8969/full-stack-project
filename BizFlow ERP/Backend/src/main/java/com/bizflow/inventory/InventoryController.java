package com.bizflow.inventory;

import com.bizflow.common.ApiResponse;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/inventory")
public class InventoryController {
    @GetMapping("/summary")
    ApiResponse<Map<String, Object>> summary() {
        return ApiResponse.ok("Inventory summary loaded", Map.of(
                "totalProducts", 2450,
                "totalStock", 18540,
                "lowStock", 32,
                "outOfStock", 8,
                "warehouses", 5
        ));
    }

    @GetMapping("/products")
    ApiResponse<List<Map<String, Object>>> products() {
        return ApiResponse.ok("Products loaded", List.of(
                Map.of("sku", "BF-INV-001", "name", "Thermal Printer", "stock", 48, "warehouse", "Mumbai"),
                Map.of("sku", "BF-INV-002", "name", "Barcode Scanner", "stock", 9, "warehouse", "Delhi"),
                Map.of("sku", "BF-INV-003", "name", "POS Terminal", "stock", 0, "warehouse", "Bengaluru")
        ));
    }
}
