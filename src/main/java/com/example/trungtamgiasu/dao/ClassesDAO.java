package com.example.trungtamgiasu.dao;

import com.example.trungtamgiasu.model.Classes;
import com.example.trungtamgiasu.model.enums.ClassesStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClassesDAO extends JpaRepository<Classes, Long>, JpaSpecificationExecutor<Classes> {

    List<Classes> findByStatus(ClassesStatus status);

    Optional<Classes> findById(Long id);
}
