package com.bizflow.csm;

import com.bizflow.common.ApiResponse;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/csm")
public class CsmController {
    @GetMapping("/accounts")
    ApiResponse<List<Map<String, Object>>> accounts() {
        return ApiResponse.ok("Customer success accounts loaded", List.of(
                Map.of("customer", "ABC Pvt Ltd", "healthScore", 82, "renewalDays", 42, "openTickets", 2, "manager", "Rahul"),
                Map.of("customer", "Nova Traders", "healthScore", 64, "renewalDays", 16, "openTickets", 5, "manager", "Priya")
        ));
    }
}
