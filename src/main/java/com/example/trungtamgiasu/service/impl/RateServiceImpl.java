package com.example.trungtamgiasu.service.impl;

import com.example.trungtamgiasu.dao.RateDAO;
import com.example.trungtamgiasu.dao.TutorDAO;
import com.example.trungtamgiasu.dao.UserDAO;
import com.example.trungtamgiasu.exception.ResourceNotFoundException;
import com.example.trungtamgiasu.model.Rate;
import com.example.trungtamgiasu.parsing.RateParsing;
import com.example.trungtamgiasu.service.RateService;
import com.example.trungtamgiasu.vo.Rate.RateInfoVO;
import com.example.trungtamgiasu.vo.Rate.RateVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RateServiceImpl implements RateService {
    @Autowired
    private RateDAO rateDAO;

    @Autowired
    private UserDAO userDAO;

    @Autowired
    private TutorDAO tutorDAO;

    @Autowired
    private RateParsing rateParsing;

    @Override
    public Rate createRating(RateVO rateVO) {
        Rate rate = new Rate();
        rate.setStar(rateVO.getStar());
        rate.setComment(rateVO.getComment());
        rate.setUser(userDAO.findByPhone(rateVO.getPhone()).
                orElseThrow(() -> new ResourceNotFoundException("User", "phone", rateVO.getPhone())));
        rate.setTutor(tutorDAO.findById(rateVO.getIdTutor()).
                orElseThrow(() -> new ResourceNotFoundException("Tutor", "id", rateVO.getIdTutor())));
        return rateDAO.save(rate);
    }

    @Override
    public List<RateInfoVO> getAllRatingByIdTutor(Long idTutor) {
        return rateParsing.toRateInfoVOS(rateDAO.findByTutor_Id(idTutor));
    }
}
