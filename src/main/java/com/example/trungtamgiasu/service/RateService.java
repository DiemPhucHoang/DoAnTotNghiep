package com.example.trungtamgiasu.service;

import com.example.trungtamgiasu.model.Rate;
import com.example.trungtamgiasu.vo.Rate.RateInfoVO;
import com.example.trungtamgiasu.vo.Rate.RateVO;

import java.util.List;

public interface RateService {
    Rate createRating(RateVO rateVO);

    List<RateInfoVO> getAllRatingByIdTutor(Long idTutor);
}
