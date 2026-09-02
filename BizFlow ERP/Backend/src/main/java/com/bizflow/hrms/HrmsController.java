package com.bizflow.hrms;

import com.bizflow.common.ApiResponse;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/hrms")
public class HrmsController {
    @GetMapping("/summary")
    ApiResponse<Map<String, Object>> summary() {
        return ApiResponse.ok("HRMS summary loaded", Map.of(
                "employees", 245,
                "present", 218,
                "absent", 12,
                "onLeave", 15,
                "payroll", 1845000
        ));
    }

    @PostMapping("/attendance/checkin")
    ApiResponse<Map<String, Object>> checkIn(@RequestBody Map<String, Object> body) {
        return ApiResponse.ok("Attendance check-in marked", Map.of("status", "PRESENT", "employeeId", body.getOrDefault("employeeId", "emp-demo")));
    }
}
