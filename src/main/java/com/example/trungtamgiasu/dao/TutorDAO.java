package com.example.trungtamgiasu.dao;

import com.example.trungtamgiasu.model.Tutor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface TutorDAO extends JpaRepository<Tutor, Long>, JpaSpecificationExecutor<Tutor> {
}
