package com.ecommerce.db.controller;

import com.ecommerce.db.entity.User;
import com.ecommerce.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequiredArgsConstructor
public class ProfileController {

    private final UserRepository userRepository;

    @GetMapping("/profile")
    public User getProfile(Authentication authentication) {

        String username = authentication.getName();

        return userRepository.findByUsername(username)
                .orElse(null);
    }

    @PutMapping("/profile")
    public User updateProfile(Authentication authentication,
                              @RequestBody User updatedUser) {

        String username = authentication.getName();
        User user = userRepository.findByUsername(username).orElseThrow();

        user.setEmail(updatedUser.getEmail());
        return userRepository.save(user);
    }

    @PutMapping("/change-password")
    public String changePassword(Authentication authentication,
                                 @RequestBody Map<String, String> body) {

        String username = authentication.getName();
        User user = userRepository.findByUsername(username).orElseThrow();

        String newPassword = body.get("newPassword");
        user.setPassword(new BCryptPasswordEncoder().encode(newPassword));
        userRepository.save(user);

        return "Password updated successfully";
    }

}

