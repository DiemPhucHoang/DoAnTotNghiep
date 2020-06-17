package com.example.trungtamgiasu.controller;

import com.example.trungtamgiasu.service.SubjectService;
import com.example.trungtamgiasu.vo.payload.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/subject")
public class SubjectController {

    @Autowired
    private SubjectService subjectService;

    @GetMapping()
    public ApiResponse getAll() {
        return new ApiResponse(
                true,
                "Get all subject successfully",
                subjectService.getAll());
    }

}
