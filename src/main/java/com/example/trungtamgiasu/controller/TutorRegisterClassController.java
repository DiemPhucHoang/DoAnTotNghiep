package com.example.trungtamgiasu.controller;

import com.example.trungtamgiasu.service.TutorRegisterClassService;
import com.example.trungtamgiasu.vo.TutorRegisterClass.*;
import com.example.trungtamgiasu.vo.payload.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/register-class")
public class TutorRegisterClassController {
    @Autowired
    private TutorRegisterClassService tutorRegisterClassService;

    @PostMapping("/{idClass}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_TUTOR')")
    public ApiResponse registerClass(@RequestBody TutorRegisterClassVO registerClassVO,
                                           @PathVariable("idClass") Long idClass,
                                           Authentication auth) {
        try {
            TutorRegisterClassInfoVO registerClass = tutorRegisterClassService.
                    createTutorRegisterClass(registerClassVO, idClass, auth);
            return new ApiResponse(true, "Register class successfully", registerClass);
        } catch (Exception e) {
            return new ApiResponse(false, "Register class failed", e.toString());
        }
    }

    @GetMapping("/tutor/{idUser}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_TUTOR')")
    public ApiResponse getAllClassRegisterByTutor(@PathVariable("idUser") Long idUser) {
        try {
            List<ClassRegisterVO> classRegisterVOList = tutorRegisterClassService.getAllClassRegister(idUser);
            return new ApiResponse(true,
                    "Get all class register by user " + idUser + " successfully"
                    , classRegisterVOList);
        } catch (Exception e) {
            return new ApiResponse(false,
                    "Get all class register by user " + idUser + " failed"
                    , e.toString());
        }

    }

    @GetMapping("/class/{idClass}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_TUTOR')")
    public ApiResponse getAllTutorRegisterClass(@PathVariable("idClass") Long idClass, Pageable pageable) {
        Page<TutorRegisterClassInfoVO> tutorRegisterClassInfoVOList =
                tutorRegisterClassService.getAllTutorRegisterClass(idClass, pageable);
        return new ApiResponse(true,
                "Get all tutor register class " + idClass + " successfully"
                , tutorRegisterClassInfoVOList);
    }

    @PatchMapping("/{idRegister}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_TUTOR')")
    public ApiResponse changeStatusTutorRegisterClass(@PathVariable("idRegister") Long idRegister) {
        try {
            tutorRegisterClassService.changeStatusTutorRegisterClass(idRegister);
            return new ApiResponse(true, "Change status successfully");
        } catch (Exception e) {
            return new ApiResponse(false, "Change status failed", e.toString());
        }
    }

    @GetMapping()
    public ApiResponse getAllTutorRegisterClassDetail(@PageableDefault(size = 6) Pageable pageable) {
        try {
            Page<ClassTutorVO> detailVOS = tutorRegisterClassService.getAllTutorClassRegister(pageable);
            return new ApiResponse(true, "Get all tutor register class detail successfully", detailVOS);
        } catch (Exception e) {
            return new ApiResponse(false, "Get all tutor register class detail failed", e.toString());
        }
    }

    @GetMapping("/tutorRegister/{idClass}")
    public ApiResponse getAllTutorRegisterDetailByIdClass(@PathVariable("idClass") Long idClass, Pageable pageable) {
        try {
            Page<TutorRegisterDetailVO> tutorRegisterDetailVOS = tutorRegisterClassService.getListTutorRegisterClassByIdClass(idClass, pageable);
            return new ApiResponse(true, "Get all tutor register class detail successfully", tutorRegisterDetailVOS);
        } catch (Exception e) {
            return new ApiResponse(false, "Get all tutor register class detail failed", e.toString());
        }
    }

    @PatchMapping("/tutorRegister/updateStatus/{id}")
    public ApiResponse updateTutorRegisterClassStatus(@PathVariable("id") Long id) {
        try {
            tutorRegisterClassService.updateStatusTutorRegisterClass(id);
            return new ApiResponse(true, "Update status tutor register class successfully");
        } catch (Exception e) {
            return new ApiResponse(false, "Update status tutor register class failed", e.toString());
        }
    }
}
