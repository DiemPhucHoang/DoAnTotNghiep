package com.example.trungtamgiasu.parsing;

import com.example.trungtamgiasu.model.Rate;
import com.example.trungtamgiasu.vo.Rate.RateInfoVO;

import java.util.List;

public interface RateParsing {

    RateInfoVO toRateInfoVO(Rate rate);

    List<RateInfoVO> toRateInfoVOS(List<Rate> rates);
}
