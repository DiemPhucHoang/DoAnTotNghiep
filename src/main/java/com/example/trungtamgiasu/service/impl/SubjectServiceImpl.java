package com.example.trungtamgiasu.service.impl;

import com.example.trungtamgiasu.dao.SubjectDAO;
import com.example.trungtamgiasu.mapper.SubjectMapper;
import com.example.trungtamgiasu.service.SubjectService;
import com.example.trungtamgiasu.vo.Subject.SubjectVO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubjectServiceImpl implements SubjectService {
    Logger logger = LoggerFactory.getLogger(this.getClass().getName());

    @Autowired
    private SubjectMapper subjectMapper;

    @Autowired
    private SubjectDAO subjectDAO;

    @Override
    public List<SubjectVO> getAll() {
        logger.info("Get all subject");
        return subjectMapper.toSubjectsVOList(subjectDAO.findAll());
    }
}
