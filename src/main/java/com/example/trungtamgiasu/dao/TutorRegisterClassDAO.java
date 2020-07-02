package com.example.trungtamgiasu.dao;

import com.example.trungtamgiasu.model.Classes;
import com.example.trungtamgiasu.model.TutorRegisterClass;
import com.example.trungtamgiasu.model.enums.TutorRegisterClassStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface TutorRegisterClassDAO extends JpaRepository<TutorRegisterClass, Long> {

    List<TutorRegisterClass> findAllByClasses(Classes classes);

    @Query(value = "select * from tutor_register_class where id_class = ?1 and status != 'DAHUY'", nativeQuery = true)
    List<TutorRegisterClass> getAllByClasses(Long idClass);

    @Query(value = "select  * from tutor_register_class where id_tutor = ?1", nativeQuery = true)
    List<TutorRegisterClass> getAllByTutors(Long idTutor);

    @Modifying
    @Transactional
    @Query(value = "update tutor_register_class set status = ?1 where id_register = ?2", nativeQuery = true)
    void changeStatusClassRegister(String status, Long id);

    Optional<TutorRegisterClass> findById(Long id);
}
