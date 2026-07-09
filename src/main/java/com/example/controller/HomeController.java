package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.dao.UserRepositry;
import com.example.entity.User;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ModelAttribute;



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
        model.addAttribute("user",new User());
        return "signup";
    }
    @GetMapping("/login")
    public String signin(Model model) {

        model.addAttribute("title",
                "Login - Smart Contact Manager");

        return "login";
    }
    //this handler method will handle the registratio
    @PostMapping("/do_register")
    public String registerUser(@ModelAttribute("user") User user, @RequestParam(value = "agreement", defaultValue = "false") boolean agreement, Model model) {
        
        if(!agreement) {
            System.out.println("You have not agreed the terms and conditions");
            throw new RuntimeException("You have not agreed the terms and conditions");
        }
        user.setRole("Role_USER");
        user.setEnabled(true);
        user.setImageUrl("default.png");
        System.out.println("Agreement: " + agreement);
        System.out.println("User: " + user);
        User result=this.userRepository.save(user);

        model.addAttribute("user",result);
        return "signup";
    }
    
    
}