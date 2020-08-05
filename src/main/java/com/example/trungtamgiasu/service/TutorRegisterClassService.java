package com.example.trungtamgiasu.service;

import com.example.trungtamgiasu.model.TutorRegisterClass;
import com.example.trungtamgiasu.vo.TutorRegisterClass.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface TutorRegisterClassService {
    TutorRegisterClass saveTutorRegisterClass(TutorRegisterClass registerClass);

    TutorRegisterClassInfoVO createTutorRegisterClass(TutorRegisterClassVO tutorRegisterClassVO, Long idClass,
                                                      Authentication auth);

    List<ClassRegisterVO> getAllClassRegister(Long idUser);

    Page<TutorRegisterClassInfoVO> getAllTutorRegisterClass(Long idClass, Pageable pageable);

    void changeStatusTutorRegisterClass(Long id);

    Page<ClassTutorVO> getAllTutorClassRegister(Pageable pageable);

    Page<TutorRegisterDetailVO> getListTutorRegisterClassByIdClass(Long idClass, Pageable pageable);

    void updateStatusTutorRegisterClass(Long idTutorRegisterClass) throws Exception;
}
