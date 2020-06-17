package com.example.trungtamgiasu.dao;

import com.example.trungtamgiasu.model.Classes;
import com.example.trungtamgiasu.model.ClassesStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClassesDAO extends JpaRepository<Classes, Long> {

    List<Classes> findByStatus(ClassesStatus status);
}
