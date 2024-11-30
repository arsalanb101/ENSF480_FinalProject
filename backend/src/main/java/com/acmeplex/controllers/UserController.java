package com.acmeplex.controllers;

import com.acmeplex.models.User;
import com.acmeplex.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Register new user
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        // Check if username already exists
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Username already exists");
        }

        // Hash the password
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Save the new user to the database
        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully");
    }

    // Login user
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user) {
        // Find the user by username
        Optional<User> existingUser = userRepository.findByUsername(user.getUsername());

        // Check if the user exists
        if (existingUser.isEmpty()) {
            return ResponseEntity.badRequest().body("User not found");
        }

        // Check if the password is correct (using password encoder to compare hashed password)
        if (!passwordEncoder.matches(user.getPassword(), existingUser.get().getPassword())) {
            return ResponseEntity.badRequest().body("Invalid password");
        }

        return ResponseEntity.ok("Login successful");
    }
}
