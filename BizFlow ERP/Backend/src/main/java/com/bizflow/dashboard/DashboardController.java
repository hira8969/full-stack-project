package com.bizflow.dashboard;

import com.bizflow.common.ApiResponse;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/dashboard")
public class DashboardController {
    @GetMapping("/overview")
    ApiResponse<Map<String, Object>> overview(@RequestHeader(value = "X-Tenant-ID", defaultValue = "tenant-demo") String tenantId) {
        return ApiResponse.ok("Tenant overview loaded", Map.of(
                "tenantId", tenantId,
                "metrics", List.of(
                        Map.of("label", "Revenue", "value", "18.4L", "trend", "+12.4%"),
                        Map.of("label", "Open Deals", "value", "42", "trend", "+8"),
                        Map.of("label", "Low Stock", "value", "32", "trend", "-4"),
                        Map.of("label", "Employees Present", "value", "218", "trend", "89%")
                ),
                "modules", List.of("CRM", "Inventory", "HRMS", "CSM", "Finance", "Payments")
        ));
    }
}
