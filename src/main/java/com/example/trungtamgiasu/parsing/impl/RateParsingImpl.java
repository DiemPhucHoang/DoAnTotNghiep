package com.example.trungtamgiasu.parsing.impl;

import com.example.trungtamgiasu.model.Rate;
import com.example.trungtamgiasu.parsing.RateParsing;
import com.example.trungtamgiasu.vo.Rate.RateInfoVO;
import org.springframework.stereotype.Component;

import java.text.Format;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class RateParsingImpl implements RateParsing {

    @Override
    public RateInfoVO toRateInfoVO(Rate rate) {
        if(rate == null) {
            return null;
        }
        RateInfoVO rateInfoVO = new RateInfoVO();
        rateInfoVO.setStar(rate.getStar());
        rateInfoVO.setComment(rate.getComment());
        rateInfoVO.setName(rate.getUser().getName());
        if(rate.getTime() != null) {
            Format formatter = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
            String s = formatter.format(rate.getTime());
            rateInfoVO.setTime(s);
        }
        return rateInfoVO;
    }

    @Override
    public List<RateInfoVO> toRateInfoVOS(List<Rate> rates) {
        if(rates == null) {
            return null;
        }
        List<Rate> sortedRates = rates.stream()
                .sorted(Comparator.comparing(Rate::getTime).reversed())
                .collect(Collectors.toList());
        List<RateInfoVO> rateInfoVOS = new ArrayList<>();
        for (Rate rate : sortedRates) {
            rateInfoVOS.add(toRateInfoVO(rate));
        }

        return rateInfoVOS;
    }
}
