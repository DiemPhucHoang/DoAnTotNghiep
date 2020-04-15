package com.example.trungtamgiasu.dao;

import com.example.trungtamgiasu.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserDAO extends JpaRepository<User, Long> {
    Optional<User> findByPhone(String phone);
    Optional<User> findByName(String name);

    Boolean existsByPhone(String phone);
    Boolean existsByName(String name);
}
