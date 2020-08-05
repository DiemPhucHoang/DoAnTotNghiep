package com.example.trungtamgiasu.controller;

import com.example.trungtamgiasu.service.ParentRegisterTutorService;
import com.example.trungtamgiasu.vo.ParentRegisterTutor.ParentRegisterTutorVO;
import com.example.trungtamgiasu.vo.ParentRegisterTutor.TutorDetailVO;
import com.example.trungtamgiasu.vo.payload.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/parent-register-tutor")
public class ParentRegisterTutorController {
    @Autowired
    private ParentRegisterTutorService parentRegisterTutorService;

    @GetMapping()
    public ApiResponse getAllTutorRegisterClassDetail(@PageableDefault(size = 10) Pageable pageable) {
        try {
            Page<ParentRegisterTutorVO> page = parentRegisterTutorService.findAll(pageable);
            return new ApiResponse(true, "Get all parent register tutor successfully", page);
        } catch (Exception e) {
            return new ApiResponse(false, "Get all parent register tutor failed", e.toString());
        }
    }

    @GetMapping("/tutor/{idClass}")
    public ApiResponse getAllTutorRegisterDetailByIdClass(@PathVariable("idClass") Long idClass, Pageable pageable) {
        try {
            Page<TutorDetailVO> tutorDetailVOPage = parentRegisterTutorService.getListTutorByIdClass(idClass, pageable);
            return new ApiResponse(true, "Get all tutor register class detail successfully", tutorDetailVOPage);
        } catch (Exception e) {
            return new ApiResponse(false, "Get all tutor register class detail failed", e.toString());
        }
    }

    @PatchMapping("/updateStatus/{idClass}/{idTutor}")
    public ApiResponse updateTutorRegisterClassStatus(@PathVariable("idClass") Long idClass, @PathVariable("idTutor") Long idTutor) {
        try {
            parentRegisterTutorService.updateStatusParentRegisterTutor(idClass, idTutor);
            return new ApiResponse(true, "Update status tutor register class successfully");
        } catch (Exception e) {
            return new ApiResponse(false, "Update status tutor register class failed", e.toString());
        }
    }
}
