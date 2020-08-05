package com.example.trungtamgiasu.controller;

import com.example.trungtamgiasu.model.Tutor;
import com.example.trungtamgiasu.parsing.TutorParsing;
import com.example.trungtamgiasu.service.TutorService;
import com.example.trungtamgiasu.vo.SearchVO;
import com.example.trungtamgiasu.vo.Tutor.TutorByUserVO;
import com.example.trungtamgiasu.vo.Tutor.TutorInfoVO;
import com.example.trungtamgiasu.vo.Tutor.TutorVO;
import com.example.trungtamgiasu.vo.payload.ApiResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tutor")
public class TutorController {
    Logger logger = LoggerFactory.getLogger(this.getClass().getName());

    @Autowired
    private TutorService tutorService;

    @Autowired
    private TutorParsing tutorParsing;

    @PostMapping("/{idUser}")
    public ApiResponse createTutor(@RequestBody TutorVO tutorVO, @PathVariable("idUser") Long idUser) {
        try {
            Tutor tutor = tutorService.createTutor(tutorVO, idUser);
            TutorByUserVO tutorByUserVO = tutorParsing.toTutorByUserVO(tutor);
            return new ApiResponse(
                    true,
                    "Create tutor successfully",
                    tutorByUserVO);
        } catch (Exception e) {
            return new ApiResponse(true, "Create tutor failed ", e);
        }
    }

    @GetMapping
    public ApiResponse getAll(@PageableDefault(size = 6) Pageable pageable) {
        Page<TutorInfoVO> tutorInfoVOPage = tutorService.getAllByPage(pageable);
        return new ApiResponse(
                true,
                "Get all tutors successfully",
                tutorInfoVOPage);

    }

    @PostMapping("/search")
    public ApiResponse getAllBySearch(@RequestBody SearchVO searchVO, @PageableDefault(size = 6)Pageable pageable) {
        Page<TutorInfoVO> tutorInfoVOPage = tutorService.searchTutor(searchVO, pageable);
        return new ApiResponse(
                true,
                "Get all tutors by search successfully",
                tutorInfoVOPage);
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

    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_TUTOR')")
    @GetMapping("user/{idUser}")
    public ApiResponse getTutorByIdUser(@PathVariable("idUser") Long idUser) {
        logger.info("Get tutor by id user" + idUser);
        try {
            TutorByUserVO tutorByUserVO = tutorParsing.toTutorByUserVO(tutorService.getTutorByIdUser(idUser));
            return new ApiResponse(true, "Get tutor by id user" +  idUser + " successfully", tutorByUserVO);
        } catch (Exception e) {
            return new ApiResponse(false, "Get tutor by id user" +  idUser + " failed", e.toString());
        }
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

    @GetMapping("/top4")
    public ApiResponse getTop4Tutors() {
        return new ApiResponse(true, "Get top4 tutors successfully", tutorService.getTop4Tutors());
    }

    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_TUTOR')")
    @PostMapping("/edit/{idTutor}")
    public ApiResponse changeInfoTutor(@PathVariable("idTutor") Long idTutor, @RequestBody TutorVO tutorVO)  {
        try {
            TutorInfoVO tutorInfoVO = tutorService.changeInfoTutor(tutorVO, idTutor);
            return new ApiResponse(true, "Change info tutor " + idTutor + " successfully ", tutorInfoVO);
        } catch (Exception e) {
            return new ApiResponse(false, "Change info tutor " + idTutor + " failed " + e.toString());
        }
    }

    @GetMapping("/parent/{phone}")
    public ApiResponse getAllTutorByIdParent(@PathVariable("phone") String phone) {
        try {
            return new ApiResponse(true, "Get all successfully",
                    tutorService.getAllTutorRegisterClassOfParent(phone));
        } catch (Exception e) {
            return new ApiResponse(false, "Get all failed", e.toString());
        }

    }

}
