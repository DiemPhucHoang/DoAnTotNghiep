package com.example.trungtamgiasu.controller;

import com.example.trungtamgiasu.service.ClassesService;
import com.example.trungtamgiasu.vo.classes.ClassesVO;
import com.example.trungtamgiasu.vo.payload.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/class")
public class ClassesController {

    @Autowired
    private ClassesService classesService;

    @PostMapping()
    public ApiResponse createClass(@RequestBody ClassesVO classesVO) {
        return new ApiResponse(
                true,
                "Create class successfully",
                classesService.createClass(classesVO));
    }

    @GetMapping()
    public ApiResponse geAll() {
        return new ApiResponse(
                true,
                "Get all classes successfully",
                classesService.getAll());
    }


}
