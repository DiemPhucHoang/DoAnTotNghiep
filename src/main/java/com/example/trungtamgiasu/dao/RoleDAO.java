package com.example.trungtamgiasu.dao;

import com.example.trungtamgiasu.model.Role;
import com.example.trungtamgiasu.model.enums.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleDAO extends JpaRepository<Role, Long> {
    Optional<Role> findByName(RoleName roleName);
}
