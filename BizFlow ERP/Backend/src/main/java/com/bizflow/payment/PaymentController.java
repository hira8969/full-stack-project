package com.bizflow.payment;

import com.bizflow.common.ApiResponse;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/payments")
public class PaymentController {
    @PostMapping("/create-order")
    ApiResponse<Map<String, Object>> createOrder(@RequestBody Map<String, Object> body) {
        return ApiResponse.ok("Payment order created with placeholder gateway", Map.of(
                "orderId", "pay_" + UUID.randomUUID(),
                "gateway", "RAZORPAY_PLACEHOLDER",
                "amount", body.getOrDefault("amount", 0),
                "currency", "INR"
        ));
    }

    @PostMapping("/verify-payment")
    ApiResponse<Map<String, Object>> verifyPayment(@RequestBody Map<String, Object> body) {
        return ApiResponse.ok("Payment verified through backend placeholder", Map.of(
                "verified", true,
                "invoiceId", "INV-" + System.currentTimeMillis(),
                "payload", body
        ));
    }
}
