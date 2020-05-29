package com.example.trungtamgiasu.controller;

import com.example.trungtamgiasu.service.TutorService;
import com.example.trungtamgiasu.vo.SearchVO;
import com.example.trungtamgiasu.vo.Tutor.TutorVO;
import com.example.trungtamgiasu.vo.payload.ApiResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
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

    @GetMapping
    public ApiResponse getAll() {
        logger.info("Get all tutors controller");
        return new ApiResponse(
                true,
                "Get all tutors successfully",
                tutorService.getAll());

    }

    @GetMapping("/spec")
    public ApiResponse getAllBySearch(@RequestBody SearchVO searchVO) {
        logger.info("Get all tutors by search controller");
        return new ApiResponse(
                true,
                "Get all tutors by search successfully",
                tutorService.searchTutor(searchVO));
    }

    @GetMapping("/{idTutor}")
    public ApiResponse getTutorById(@PathVariable("idTutor") Long idTutor) {
        logger.info("Get tutor " + idTutor);
        return new ApiResponse(
                true,
                "Get tutor " +  idTutor + " successfully",
                tutorService.getTutorById(idTutor)
        );
    }

    @GetMapping("/{idTutor}/similar")
    public ApiResponse getSimilarTutors(@PathVariable("idTutor") Long idTutor) {
        logger.info("Get similar tutors with id tutor " + idTutor);
        return new ApiResponse(
                true,
                "Get similar tutors with id tutor" + idTutor + " successfully",
                tutorService.getSimilarTutors(idTutor)
        );
    }

    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_TUTOR')")
    @GetMapping("/image/{idUser}")
    public ApiResponse readBytesArrayImage(@PathVariable("idUser") Long idUser, Authentication auth) {
        logger.info("Read bytes array by idUser: " + idUser);
        return new ApiResponse(
                true,
                "Successfully",
                tutorService.readBytesFromFile(idUser, auth));
    }

    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_TUTOR')")
    @PostMapping("/image/{idUser}")
    public ApiResponse changeImageTutor(@PathVariable("idUser") Long idUser,
                                        @RequestPart("file") MultipartFile file, Authentication auth)
    {
        logger.info("Change image by idUser" + idUser);
        return new ApiResponse(
                true,
                "Change image tutor successfully",
                tutorService.changeImage(idUser, file, auth));
    }

}
