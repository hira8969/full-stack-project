package com.bizflow.crm;

import com.bizflow.common.ApiResponse;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/crm")
public class CrmController {
    @GetMapping("/leads")
    ApiResponse<List<Map<String, Object>>> leads(@RequestParam(defaultValue = "ALL") String status) {
        return ApiResponse.ok("Leads loaded", List.of(
                Map.of("id", "lead-101", "company", "Northstar Retail", "value", 420000, "status", "INTERESTED", "owner", "Priya"),
                Map.of("id", "lead-102", "company", "Metro Supplies", "value", 180000, "status", "QUOTATION", "owner", "Rahul"),
                Map.of("id", "lead-103", "company", "Zen Foods", "value", 760000, "status", "NEGOTIATION", "owner", "Sneha")
        ));
    }

    @PostMapping("/tickets")
    ApiResponse<Map<String, Object>> createTicket(@RequestBody Map<String, Object> body) {
        return ApiResponse.ok("Support ticket created", Map.of("ticketId", "ticket-5001", "status", "OPEN", "payload", body));
    }
}
