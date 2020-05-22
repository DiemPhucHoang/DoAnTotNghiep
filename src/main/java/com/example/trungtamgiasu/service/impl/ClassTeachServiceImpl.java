package com.example.trungtamgiasu.service.impl;

import com.example.trungtamgiasu.dao.ClassTeachDAO;
import com.example.trungtamgiasu.exception.BadRequestException;
import com.example.trungtamgiasu.model.ClassTeach;
import com.example.trungtamgiasu.service.ClassTeachService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClassTeachServiceImpl implements ClassTeachService {
    Logger logger = LoggerFactory.getLogger(this.getClass().getName());

    @Autowired
    private ClassTeachDAO classTeachDAO;

    @Override
    public ClassTeach getById(Long id) {
        logger.info("Get class teach  by id " + id);
        return classTeachDAO.findById(id).
                orElseThrow(() -> new BadRequestException("Class teach " + id + "does not exists"));
    }
}
