package com.example.trungtamgiasu.dao;

import com.example.trungtamgiasu.model.District;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DistrictDAO extends JpaRepository<District, Long> {
    Optional<District> findById(Long id);
}
