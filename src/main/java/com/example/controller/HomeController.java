package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ModelAttribute;

import com.example.dao.UserRepositry;
import com.example.entity.User;

import jakarta.validation.Valid;
import org.springframework.validation.BindingResult;

@Controller
public class HomeController {

    @Autowired
    private UserRepositry userRepository;

    @Autowired
    public HomeController(UserRepositry userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/")
    public String home(Model model) {
        model.addAttribute("title", "Home - Smart Contact Manager");
        return "home";
    }

    @GetMapping("/about")
    public String about(Model model) {
        model.addAttribute("title", "About - Smart Contact Manager");
        return "about";
    }

    @GetMapping("/signup")
    public String signup(Model model) {
        model.addAttribute("title", "Signup - Smart Contact Manager");
        model.addAttribute("user", new User());
        return "signup";
    }

    @GetMapping("/login")
    public String signin(Model model) {
        model.addAttribute("title", "Login - Smart Contact Manager");
        return "login";
    }

    // Handle Registration
    @PostMapping("/do_register")
    public String registerUser(
            @Valid @ModelAttribute("user") User user,
            BindingResult result,
            Model model) {

    // Default values
         user.setRole("ROLE_USER");
        user.setEnabled(true);

        if(user.getImageUrl() == null || user.getImageUrl().isEmpty()) {
            user.setImageUrl("membership.png");
        }

        if (result.hasErrors()) {
            model.addAttribute("title", "Signup - Smart Contact Manager");
            model.addAttribute("user", user);
            return "signup";
        }

        userRepository.save(user);

        model.addAttribute("user", new User());
        model.addAttribute("successMessage",
                "Registration Successful!");

        return "signup";
    }

}