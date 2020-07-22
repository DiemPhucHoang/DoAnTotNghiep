package com.example.trungtamgiasu.controller;

import com.example.trungtamgiasu.service.RateService;
import com.example.trungtamgiasu.vo.Rate.RateVO;
import com.example.trungtamgiasu.vo.payload.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/rate")
public class RateController {
    @Autowired
    private RateService rateService;

    @PostMapping()
    public ApiResponse createRating(@RequestBody RateVO rateVO) {
        try {
            return new ApiResponse(true, "Create rating successfully", rateService.createRating(rateVO));
        } catch (Exception e) {
            return new ApiResponse(false, "Create rating failed", rateService.createRating(rateVO));
        }
    }

    @GetMapping("/{idTutor}")
    public ApiResponse getAllByIdTutor(@PathVariable("idTutor") Long idTutor) {
        return new ApiResponse(true, "Get all rate by id tutor successfully",
                rateService.getAllRatingByIdTutor(idTutor));
    }
}
