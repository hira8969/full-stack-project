package com.bizflow.otp;

import com.bizflow.common.ApiResponse;
import jakarta.validation.constraints.NotBlank;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/otp")
public class OtpController {
    @PostMapping("/send")
    ApiResponse<Map<String, Object>> send(@RequestBody OtpSendRequest request) {
        return ApiResponse.ok("OTP queued through placeholder provider", Map.of(
                "channel", request.channel(),
                "destination", request.destination(),
                "expiresAt", Instant.now().plusSeconds(300).toString(),
                "devOtp", "123456"
        ));
    }

    @PostMapping("/verify")
    ApiResponse<Map<String, Object>> verify(@RequestBody OtpVerifyRequest request) {
        return ApiResponse.ok("OTP verified", Map.of("verified", "123456".equals(request.otp())));
    }

    record OtpSendRequest(@NotBlank String channel, @NotBlank String destination) {}
    record OtpVerifyRequest(@NotBlank String destination, @NotBlank String otp) {}
}
