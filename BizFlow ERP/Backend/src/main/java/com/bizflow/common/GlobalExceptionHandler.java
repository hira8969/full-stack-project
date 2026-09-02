package com.bizflow.common;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    ApiResponse<Map<String, String>> validation(MethodArgumentNotValidException ex) {
        return ApiResponse.ok("Validation failed", Map.of("error", ex.getBindingResult().getAllErrors().getFirst().getDefaultMessage()));
    }
}
