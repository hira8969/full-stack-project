package com.example.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.entity.User;

public interface UserRepositry extends JpaRepository<User, Integer> {

}
