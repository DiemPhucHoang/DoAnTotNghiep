package com.example.trungtamgiasu.dao;

import com.example.trungtamgiasu.model.ClassTeach;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClassTeachDAO extends JpaRepository<ClassTeach, Long> {
    Optional<ClassTeach> findById(Long id);

    List<ClassTeach> findAll();

    Optional<ClassTeach> findByClassTeachName(String name);
}
