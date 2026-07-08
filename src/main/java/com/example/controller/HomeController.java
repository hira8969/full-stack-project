package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.dao.UserRepositry;
import com.example.entity.User;
import org.springframework.web.bind.annotation.RequestParam;


@Controller
public class HomeController {

    private final UserRepositry userRepository;

    @Autowired
    public HomeController(UserRepositry userRepository) {
        this.userRepository = userRepository;
    }


        
    @GetMapping("/")
    public String home(Model model) {
        model.addAttribute("title","Home- Smart Contact Manager");
        return "home";
    }
    @GetMapping("/about")
    public String about(Model model) {
        model.addAttribute("title","About- Smart Contact Manager");
        return "about";
    }
    @GetMapping("/signup")
    public String signup(Model model) {
        model.addAttribute("title","Signup- Smart Contact Manager");
        return "signup";
    }
    

    
}