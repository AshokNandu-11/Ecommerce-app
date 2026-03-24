package com.ecommerce.db.controller;


import com.ecommerce.db.config.JwtUtil;
import com.ecommerce.db.entity.User;
import com.ecommerce.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @PostMapping("/register")
    public User register (@RequestBody User user){
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody User user) {

        System.out.println("LOGIN API HIT");

        User dbUser = userRepository.findByUsername(user.getUsername())
                .orElse(null);

        if (dbUser == null) {
            System.out.println("USER NOT FOUND");
            throw new RuntimeException("User not found");
        }

        System.out.println("USER FOUND: " + dbUser.getUsername());

        if (!passwordEncoder.matches(user.getPassword(), dbUser.getPassword())) {
            System.out.println("PASSWORD WRONG");
            throw new RuntimeException("Invalid credentials");
        }

        System.out.println("PASSWORD MATCHED");

        String token = jwtUtil.generateToken(user.getUsername());

        return Map.of("token", token, "role", dbUser.getRole());
    }

}
