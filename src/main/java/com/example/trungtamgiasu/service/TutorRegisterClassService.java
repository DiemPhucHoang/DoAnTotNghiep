package com.example.trungtamgiasu.service;

import com.example.trungtamgiasu.model.TutorRegisterClass;
import com.example.trungtamgiasu.vo.TutorRegisterClass.ClassRegisterVO;
import com.example.trungtamgiasu.vo.TutorRegisterClass.TutorRegisterClassInfoVO;
import com.example.trungtamgiasu.vo.TutorRegisterClass.TutorRegisterClassVO;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface TutorRegisterClassService {
    TutorRegisterClass saveTutorRegisterClass(TutorRegisterClass registerClass);

    TutorRegisterClassInfoVO createTutorRegisterClass(TutorRegisterClassVO tutorRegisterClassVO, Long idClass,
                                                      Authentication auth);

    List<ClassRegisterVO> getAllClassRegister(Long idUser);

    List<TutorRegisterClassInfoVO> getAllTutorRegisterClass(Long idClass);

    ClassRegisterVO changeStatusTutorRegisterClass(Long id);
}
