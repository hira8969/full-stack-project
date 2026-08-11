package com.example.config;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.dao.UserRepositry;
import com.example.entity.User;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepositry userRepository;

    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {

        // Fetch user from database using email
        User user= userRepository.getUserByUserName(username);
        if(user == null)
        {
            throw new UsernameNotFoundException("Could not found !!");
        }
        CustomUserDetails customUserDetails= new CustomUserDetails(user);

        return new CustomUserDetails(user);
    }
}