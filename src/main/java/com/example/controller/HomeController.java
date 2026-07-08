package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.dao.UserRepositry;
import com.example.entity.User;

@Controller
public class HomeController {

    private final UserRepositry userRepository;

    @Autowired
    public HomeController(UserRepositry userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/test")
    @ResponseBody
    public String test() {

        User user = new User();
        user.setName("Hiralal Kumar");
        user.setEmail("hk2493200@gmail.com");
        user.setPassword("12345");
        user.setRole("ROLE_USER");
        user.setEnabled(true);

        userRepository.save(user);

        return "Working";
    }
}