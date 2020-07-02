package com.example.trungtamgiasu.dao;

import com.example.trungtamgiasu.model.Tutor;
import com.example.trungtamgiasu.model.User;
import com.example.trungtamgiasu.model.enums.TutorStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TutorDAO extends JpaRepository<Tutor, Long>, JpaSpecificationExecutor<Tutor> {
    List<Tutor> findAll();

    List<Tutor> findByStatus(TutorStatus tutorStatus);

    Page<Tutor> findByStatus(TutorStatus tutorStatus, Pageable pageable);

    List<Tutor> findBySubjects_SubjectName(String subject);

    Optional<Tutor> findById(Long id);

    Optional<Tutor> findByUser(User user);

    boolean existsById(Long id);

    boolean existsByUser(User user);
}
