package com.example.trungtamgiasu.parsing;

import com.example.trungtamgiasu.model.TutorRegisterClass;
import com.example.trungtamgiasu.vo.TutorRegisterClass.ClassRegisterVO;
import com.example.trungtamgiasu.vo.TutorRegisterClass.TutorRegisterClassInfoVO;
import com.example.trungtamgiasu.vo.TutorRegisterClass.TutorRegisterClassVO;

import java.util.List;

public interface TutorRegisterClassParsing {
    TutorRegisterClass toTutorRegisterClass(TutorRegisterClassVO tutorRegisterClassVO);

    TutorRegisterClassVO toTutorRegisterClassVO(TutorRegisterClass tutorRegisterClass);

    TutorRegisterClassInfoVO toTutorRegisterClassInfoVO(TutorRegisterClass tutorRegisterClass);

    List<TutorRegisterClassInfoVO> toTutorRegisterClassInfoVOList(List<TutorRegisterClass> tutorRegisterClasses);

    ClassRegisterVO toClassRegisterVO(TutorRegisterClass tutorRegisterClass);

    List<ClassRegisterVO> toClassRegisterVOList(List<TutorRegisterClass> tutorRegisterClasses);
}
