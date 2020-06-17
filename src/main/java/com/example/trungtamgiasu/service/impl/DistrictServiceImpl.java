package com.example.trungtamgiasu.service.impl;

import com.example.trungtamgiasu.dao.DistrictDAO;
import com.example.trungtamgiasu.mapper.DistrictMapper;
import com.example.trungtamgiasu.service.DistrictService;
import com.example.trungtamgiasu.vo.District.DistrictVO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DistrictServiceImpl implements DistrictService {
    Logger logger = LoggerFactory.getLogger(this.getClass().getName());

    @Autowired
    private DistrictMapper districtMapper;

    @Autowired
    private DistrictDAO districtDAO;

    @Override
    public List<DistrictVO> getAll() {
        logger.info("Get all class teach");
        return districtMapper.toDistrictsVOList(districtDAO.findAll());
    }
}
