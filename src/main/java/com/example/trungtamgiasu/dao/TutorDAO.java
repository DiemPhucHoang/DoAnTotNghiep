package com.example.trungtamgiasu.dao;

import com.example.trungtamgiasu.model.Subject;
import com.example.trungtamgiasu.model.Tutor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TutorDAO extends JpaRepository<Tutor, Long>, JpaSpecificationExecutor<Tutor> {
    List<Tutor> findAll();

    List<Tutor> findBySubjects_SubjectName(String subject);
}
