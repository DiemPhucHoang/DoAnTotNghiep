package com.example.trungtamgiasu.dao;

import com.example.trungtamgiasu.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface UserDAO extends JpaRepository<User, Long> {
    Optional<User> findByPhone(String phone);

    Optional<User> findByName(String name);

    Optional<User> findById(Long id);

    Boolean existsByPhone(String phone);

    Boolean existsByName(String name);

    @Modifying
    @Transactional
    @Query(value = "update Users as u set u.password = ?1 where u.id_user = ?2", nativeQuery = true)
    void changePassword(String password, Long idUser);
}
