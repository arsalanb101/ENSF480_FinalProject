package com.acmeplex.controllers;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/login")
public class LoginController {
    @PostMapping
    public String login(@RequestParam String username, @RequestParam String password) {
        // Mocked authentication logic
        if (username.equals("user") && password.equals("password")) {
            return "Login Successful";
        }
        return "Invalid Credentials";
    }
}
