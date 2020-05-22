package com.example.trungtamgiasu.service.impl;

import com.example.trungtamgiasu.dao.FreeTimeDAO;
import com.example.trungtamgiasu.exception.BadRequestException;
import com.example.trungtamgiasu.model.FreeTime;
import com.example.trungtamgiasu.service.FreeTimeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FreeTimeServiceImpl implements FreeTimeService {
    Logger logger = LoggerFactory.getLogger(this.getClass().getName());

    @Autowired
    private FreeTimeDAO freeTimeDAO;

    @Override
    public FreeTime getByIdFreeTime(Long id) {
        logger.info("Get free time by id " + id);
        return freeTimeDAO.findById(id).
                orElseThrow(() -> new BadRequestException("Free time by id " + id + "does not exists"));
    }

    @Override
    public FreeTime saveFreeTime(FreeTime freeTime) {
        logger.info("Save free time");
        return freeTimeDAO.save(freeTime);
    }
}
