package com.example.trungtamgiasu.service.impl;

import com.example.trungtamgiasu.dao.ClassTeachDAO;
import com.example.trungtamgiasu.mapper.ClassTeachMapper;
import com.example.trungtamgiasu.service.ClassTeachService;
import com.example.trungtamgiasu.vo.ClassTeach.ClassTeachVO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClassTeachServiceImpl implements ClassTeachService {

    Logger logger = LoggerFactory.getLogger(this.getClass().getName());

    @Autowired
    private ClassTeachMapper classTeachMapper;

    @Autowired
    private ClassTeachDAO classTeachDAO;

    @Override
    public List<ClassTeachVO> getAll() {
        logger.info("Get all class teach");
        return classTeachMapper.toClassTeachesVOList(classTeachDAO.findAll());
    }
}
