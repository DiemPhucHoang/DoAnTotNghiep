package com.example.trungtamgiasu.controller;

import com.example.trungtamgiasu.service.DistrictService;
import com.example.trungtamgiasu.vo.payload.ApiResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/district")
public class DistrictController {

    Logger logger = LoggerFactory.getLogger(this.getClass().getName());

    @Autowired
    private DistrictService districtService;

    @GetMapping()
    public ApiResponse getAll() {
        return new ApiResponse(
                true,
                "Get all districts successfully",
                districtService.getAll());
    }
}
