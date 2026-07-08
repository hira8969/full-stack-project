package com.example.Dao;

import com.example.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepositry extends JpaRepository<User, Integer> {

}
