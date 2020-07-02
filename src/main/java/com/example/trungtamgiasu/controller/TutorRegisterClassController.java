package com.example.trungtamgiasu.controller;

import com.example.trungtamgiasu.service.TutorRegisterClassService;
import com.example.trungtamgiasu.vo.TutorRegisterClass.ClassRegisterVO;
import com.example.trungtamgiasu.vo.TutorRegisterClass.TutorRegisterClassInfoVO;
import com.example.trungtamgiasu.vo.TutorRegisterClass.TutorRegisterClassVO;
import com.example.trungtamgiasu.vo.payload.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
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

    @GetMapping("/tutor/{idTutor}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_TUTOR')")
    public ApiResponse getAllClassRegisterByTutor(@PathVariable("idTutor") Long idTutor) {
        List<ClassRegisterVO> classRegisterVOList = tutorRegisterClassService.getAllClassRegister(idTutor);
        return new ApiResponse(true,
                "Get all class register by tutor " + idTutor + " successfully"
                , classRegisterVOList);
    }

    @GetMapping("/class/{idClass}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_TUTOR')")
    public ApiResponse getAllTutorRegisterClass(@PathVariable("idClass") Long idClass) {
        List<TutorRegisterClassInfoVO> tutorRegisterClassInfoVOList =
                tutorRegisterClassService.getAllTutorRegisterClass(idClass);
        return new ApiResponse(true,
                "Get all tutor register class " + idClass + " successfully"
                , tutorRegisterClassInfoVOList);
    }

    @PatchMapping("/{idRegister}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_TUTOR')")
    public ApiResponse changeStatusTutorRegisterClass(@PathVariable("idRegister") Long idRegister) {
        try {
            ClassRegisterVO classRegisterVO = tutorRegisterClassService.changeStatusTutorRegisterClass(idRegister);
            return new ApiResponse(true, "Change status successfully", classRegisterVO);
        } catch (Exception e) {
            return new ApiResponse(false, "Change status failed", e.toString());
        }
    }

}
