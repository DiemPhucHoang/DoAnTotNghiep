package com.example.trungtamgiasu.dao;

import com.example.trungtamgiasu.model.Rate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RateDAO extends JpaRepository<Rate, Long> {
    List<Rate> findByTutor_Id(Long idTutor);
}
