package com.example.trungtamgiasu.dao;

import com.example.trungtamgiasu.model.FreeTime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FreeTimeDAO extends JpaRepository<FreeTime, Long> {
    Optional<FreeTime> findById(Long id);
}
