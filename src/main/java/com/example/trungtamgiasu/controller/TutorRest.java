package com.example.trungtamgiasu.controller;

import com.example.trungtamgiasu.service.TutorService;
import com.example.trungtamgiasu.vo.SearchVO;
import com.example.trungtamgiasu.vo.TutorVO;
import com.example.trungtamgiasu.vo.payload.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tutors")
public class TutorRest {

    @Autowired
    private TutorService tutorService;

    @PostMapping
    public ApiResponse addTutor(@RequestBody TutorVO tutorVO, @RequestParam("idUser") Long idUser) {
        try {
            tutorService.save(tutorVO, idUser);
            return new ApiResponse(true, "Add tutor successfully");
        } catch (Exception e) {
            return new ApiResponse(false, "Add tutor failed", e);
        }
    }

    @GetMapping
    public ApiResponse getTutors() {
        try {
            List<TutorVO> tutorVOS = tutorService.getTutors();
            return new ApiResponse(true, "Get list tutor successfully", tutorVOS);
        } catch (Exception e) {
            return new ApiResponse(false, "Get list tutor failed", e);
        }
    }

    @GetMapping(value = "/search")
    public ApiResponse searchTutor(@RequestBody SearchVO searchVO) {
        try {
            List<TutorVO> tutorVOS = tutorService.searchTutor(searchVO);
            return new ApiResponse(true, "Search tutor successfully", tutorVOS);
        } catch (Exception e) {
            return new ApiResponse(false, "Search tutor failed", e);
        }
    }
}
