package com.example.trungtamgiasu.controller;

import com.example.trungtamgiasu.service.TutorService;
import com.example.trungtamgiasu.vo.Tutor.TutorVO;
import com.example.trungtamgiasu.vo.payload.ApiResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/tutor")
public class TutorController {
    Logger logger = LoggerFactory.getLogger(this.getClass().getName());

    @Autowired
    private TutorService tutorService;

    @PostMapping("/image")
    public ApiResponse uploadImage(@RequestPart("file")MultipartFile file) {
        logger.info("Upload file controller");
        return new ApiResponse(
                true,
                "Upload image successfully",
                tutorService.uploadImage(file));
    }

    @PostMapping("/{idUser}")
    public ApiResponse createTutor(@RequestBody TutorVO tutorVO, @PathVariable("idUser") Long idUser) {
        logger.info("Create tutor controller");
        return new ApiResponse(
                true,
                "Create tutor successfully",
                tutorService.createTutor(tutorVO, idUser));
    }






}
