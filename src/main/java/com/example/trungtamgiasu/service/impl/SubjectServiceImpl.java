package com.example.trungtamgiasu.service.impl;

import com.example.trungtamgiasu.dao.SubjectDAO;
import com.example.trungtamgiasu.exception.BadRequestException;
import com.example.trungtamgiasu.model.Subject;
import com.example.trungtamgiasu.service.SubjectService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SubjectServiceImpl implements SubjectService {
    Logger logger = LoggerFactory.getLogger(this.getClass().getName());

    @Autowired
    private SubjectDAO subjectDAO;

    @Override
    public Subject getById(Long id) {
        logger.info("Get subject by id " + id);
        return subjectDAO.findById(id)
                .orElseThrow(() -> new BadRequestException("Subject " + id + "does not exists"));
    }
}
