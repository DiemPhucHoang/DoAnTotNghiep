package com.example.trungtamgiasu.service.impl;

import com.example.trungtamgiasu.dao.DistrictDAO;
import com.example.trungtamgiasu.exception.BadRequestException;
import com.example.trungtamgiasu.model.District;
import com.example.trungtamgiasu.service.DistrictService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DistrictServiceImpl implements DistrictService {
    Logger logger = LoggerFactory.getLogger(this.getClass().getName());

    @Autowired
    private DistrictDAO districtDAO;

    @Override
    public District getById(Long id) {
        logger.info("Get district by id " + id);
        return districtDAO.findById(id).
                orElseThrow(() -> new BadRequestException("District " + id + "does not exists"));
    }
}
