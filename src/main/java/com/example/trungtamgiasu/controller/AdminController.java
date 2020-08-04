package com.example.trungtamgiasu.controller;

import com.example.trungtamgiasu.service.impl.AdminService;
import com.example.trungtamgiasu.vo.payload.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/calPercentDataChart")
    public ApiResponse calPercentOfClass(){
        return new ApiResponse(
                true,
                "cal percent of class",
                adminService.calPercentOfNumber()
        );
    }

    @GetMapping("/countTotal")
    public ApiResponse countTotal(){
        return new ApiResponse(
                true,
                "Count total",
                adminService.countTotal()
        );
    }

    @GetMapping("{id}/parent")
    public ApiResponse getParent(@PathVariable(value = "id")Long id){
        return new ApiResponse(
                true,
                "Count total",
                adminService.getUserByClass(id)
        );
    }
}
