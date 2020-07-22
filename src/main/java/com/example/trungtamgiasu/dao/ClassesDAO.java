package com.example.trungtamgiasu.dao;

import com.example.trungtamgiasu.model.Classes;
import com.example.trungtamgiasu.model.enums.ClassesStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClassesDAO extends JpaRepository<Classes, Long>, JpaSpecificationExecutor<Classes> {

    List<Classes> findByStatus(ClassesStatus status);

    Optional<Classes> findById(Long id);

    List<Classes> findTop4ByStatusOrderByTuitionFeeDesc(ClassesStatus status);

    @Query(value = "select *  from classes where class_teach = ?1 and id_class != ?2 limit 3", nativeQuery = true)
    List<Classes> getTop3Similar(String classTeach, Long idClass);

    List<Classes> findTop6ByClassTeachAndDistrictAndStatus(String classTeach, String district, ClassesStatus status);
}
