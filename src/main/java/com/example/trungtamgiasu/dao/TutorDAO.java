package com.example.trungtamgiasu.dao;

import com.example.trungtamgiasu.model.Tutor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TutorDAO extends JpaRepository<Tutor, Long> {
    List<Tutor> findAll();
}
