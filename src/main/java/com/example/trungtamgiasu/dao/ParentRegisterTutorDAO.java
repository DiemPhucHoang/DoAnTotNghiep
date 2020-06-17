package com.example.trungtamgiasu.dao;

import com.example.trungtamgiasu.model.ParentRegisterTutor;
import com.example.trungtamgiasu.model.ParentRegisterTutorKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParentRegisterTutorDAO extends JpaRepository<ParentRegisterTutor, ParentRegisterTutorKey> {
}
