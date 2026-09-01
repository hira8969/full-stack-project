package com.bizflow.auth;

import com.bizflow.common.ApiResponse;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
    @PostMapping("/login")
    ApiResponse<Map<String, Object>> login(@Valid @RequestBody LoginRequest request) {
        return ApiResponse.ok("Login successful", Map.of(
                "accessToken", "demo.jwt.token." + Instant.now().getEpochSecond(),
                "tokenType", "Bearer",
                "tenantId", "tenant-demo",
                "user", Map.of(
                        "name", "Aarav Sharma",
                        "email", request.email(),
                        "roles", List.of("SUPER_ADMIN", "ADMIN")
                )
        ));
    }

    @PostMapping("/register")
    ApiResponse<Map<String, Object>> register(@Valid @RequestBody RegisterRequest request) {
        return ApiResponse.ok("Company and admin user registered", Map.of(
                "tenantId", "tenant-" + request.companyName().toLowerCase().replaceAll("[^a-z0-9]+", "-"),
                "adminEmail", request.email()
        ));
    }

    record LoginRequest(@Email String email, @NotBlank String password) {}
    record RegisterRequest(@NotBlank String companyName, @NotBlank String name, @Email String email, @NotBlank String password) {}
}
