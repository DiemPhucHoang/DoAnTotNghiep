package com.example.trungtamgiasu.dao;

import com.example.trungtamgiasu.model.ParentRegisterTutor;
import com.example.trungtamgiasu.model.ParentRegisterTutorKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ParentRegisterTutorDAO extends JpaRepository<ParentRegisterTutor, ParentRegisterTutorKey> {
    @Query(value = "select * from parent_register_tutor where id_class = ?1 ", nativeQuery = true)
    List<ParentRegisterTutor> findAllByClass(Long idClass);

    @Query(value = "select * from parent_register_tutor where id_class = ?1 and id_tutor = ?2 ", nativeQuery = true)
    ParentRegisterTutor findByClassAndTutor(Long idClass, Long idTutor);
}
