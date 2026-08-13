package com.shopsphere.controller;

import com.shopsphere.dto.auth.AuthResponse;
import com.shopsphere.dto.auth.LoginRequest;
import com.shopsphere.dto.auth.RegisterRequest;
import com.shopsphere.entity.User;
import com.shopsphere.exception.BadRequestException;
import com.shopsphere.repository.UserRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @PostMapping("/register")
    public AuthResponse register(@Valid @RequestBody RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email already exists");
        }

        String[] names = request.getFullName().trim().split("\\s+", 2);
        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .firstName(names[0])
                .lastName(names.length > 1 ? names[1] : "")
                .phone(request.getPhone())
                .enabled(true)
                .build();
        userRepository.save(user);
        return responseFor(user);
    }

    @PostMapping("/login")
    public AuthResponse login(@Valid @RequestBody LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BadRequestException("Invalid email or password"));
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new BadRequestException("Invalid email or password");
        }
        return responseFor(user);
    }

    private AuthResponse responseFor(User user) {
        return AuthResponse.builder()
                .token(UUID.randomUUID().toString())
                .email(user.getEmail())
                .fullName((user.getFirstName() + " " + user.getLastName()).trim())
                .build();
    }
}
