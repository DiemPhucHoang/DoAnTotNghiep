package com.example.trungtamgiasu.dao;

import com.example.trungtamgiasu.model.Tutor;
import com.example.trungtamgiasu.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TutorDAO extends JpaRepository<Tutor, Long>, JpaSpecificationExecutor<Tutor> {
    List<Tutor> findAll();

    List<Tutor> findBySubjects_SubjectName(String subject);

    Optional<Tutor> findById(Long id);

    Optional<Tutor> findByUser(User user);
}
