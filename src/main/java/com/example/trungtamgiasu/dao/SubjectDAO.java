package com.example.trungtamgiasu.dao;

import com.example.trungtamgiasu.model.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SubjectDAO extends JpaRepository<Subject, Long> {
    Optional<Subject> findById(Long id);

    Optional<Subject> findBySubjectName(String name);

    List<Subject> findAll();

}
