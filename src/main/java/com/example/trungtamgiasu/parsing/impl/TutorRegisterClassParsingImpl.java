package com.example.trungtamgiasu.parsing.impl;

import com.example.trungtamgiasu.model.TutorRegisterClass;
import com.example.trungtamgiasu.model.enums.TutorRegisterClassStatus;
import com.example.trungtamgiasu.parsing.TutorRegisterClassParsing;
import com.example.trungtamgiasu.vo.TutorRegisterClass.ClassRegisterVO;
import com.example.trungtamgiasu.vo.TutorRegisterClass.TutorRegisterClassInfoVO;
import com.example.trungtamgiasu.vo.TutorRegisterClass.TutorRegisterClassVO;
import org.springframework.stereotype.Component;

import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

@Component
public class TutorRegisterClassParsingImpl implements TutorRegisterClassParsing {
    @Override
    public TutorRegisterClass toTutorRegisterClass(TutorRegisterClassVO tutorRegisterClassVO) {
        if(tutorRegisterClassVO == null) {
            return null;
        }

        TutorRegisterClass tutorRegisterClass = new TutorRegisterClass();
        tutorRegisterClass.setStatus(TutorRegisterClassStatus.from(tutorRegisterClassVO.getStatus()));
        tutorRegisterClass.setDateReceive(tutorRegisterClassVO.getDateReceive());
        tutorRegisterClass.setPayment(tutorRegisterClassVO.getPayment());
        tutorRegisterClass.setMoreRequire(tutorRegisterClassVO.getMoreRequire());
        return tutorRegisterClass;
    }

    @Override
    public TutorRegisterClassVO toTutorRegisterClassVO(TutorRegisterClass tutorRegisterClass) {
        if(tutorRegisterClass == null) {
            return null;
        }

        TutorRegisterClassVO tutorRegisterClassVO = new TutorRegisterClassVO();
        tutorRegisterClassVO.setStatus(tutorRegisterClass.getStatus().getKey());
        tutorRegisterClassVO.setDateReceive(tutorRegisterClass.getDateReceive());
        tutorRegisterClassVO.setPayment(tutorRegisterClass.getPayment());
        tutorRegisterClassVO.setMoreRequire(tutorRegisterClass.getMoreRequire());
        return tutorRegisterClassVO;
    }

    @Override
    public TutorRegisterClassInfoVO toTutorRegisterClassInfoVO(TutorRegisterClass tutorRegisterClass) {
        if(tutorRegisterClass == null) {
            return null;
        }

        TutorRegisterClassInfoVO tutorRegisterClassInfoVO = new TutorRegisterClassInfoVO();
        tutorRegisterClassInfoVO.setIdTutor(tutorRegisterClass.getTutor().getId());
        tutorRegisterClassInfoVO.setName(tutorRegisterClass.getTutor().getUser().getName());
        tutorRegisterClassInfoVO.setLevel(tutorRegisterClass.getTutor().getLevel());
        tutorRegisterClassInfoVO.setStatus(tutorRegisterClass.getStatus().getKey());
        tutorRegisterClassInfoVO.setGender(tutorRegisterClass.getTutor().getGender());
        tutorRegisterClassInfoVO.setPayment(tutorRegisterClass.getPayment());
        return tutorRegisterClassInfoVO;
    }

    @Override
    public List<TutorRegisterClassInfoVO> toTutorRegisterClassInfoVOList(List<TutorRegisterClass> tutorRegisterClasses) {
        if(tutorRegisterClasses == null) {
            return null;
        }
        List<TutorRegisterClassInfoVO> registerClassInfoVOS = new ArrayList<>();
        for (TutorRegisterClass registerClass : tutorRegisterClasses) {
            registerClassInfoVOS.add(toTutorRegisterClassInfoVO(registerClass));
        }
        return registerClassInfoVOS;
    }

    @Override
    public ClassRegisterVO toClassRegisterVO(TutorRegisterClass tutorRegisterClass) {
        if(tutorRegisterClass == null) {
            return null;
        }
        ClassRegisterVO classRegisterVO = new ClassRegisterVO();
        classRegisterVO.setIdRegister(tutorRegisterClass.getId());
        classRegisterVO.setIdClass(tutorRegisterClass.getClasses().getId());
        classRegisterVO.setClassTeach(tutorRegisterClass.getClasses().getClassTeach());
        classRegisterVO.setSubject(tutorRegisterClass.getClasses().getSubject());
        classRegisterVO.setTuitionFee(NumberFormat.getNumberInstance(Locale.US).
                format(tutorRegisterClass.getClasses().getTuitionFee()));
        classRegisterVO.setPayment(tutorRegisterClass.getPayment());
        classRegisterVO.setStatus(tutorRegisterClass.getStatus().getKey());
        return classRegisterVO;
    }

    @Override
    public List<ClassRegisterVO> toClassRegisterVOList(List<TutorRegisterClass> tutorRegisterClasses) {
        if(tutorRegisterClasses == null) {
            return null;
        }
        List<ClassRegisterVO> classRegisterVOList = new ArrayList<>();
        for (TutorRegisterClass item: tutorRegisterClasses) {
            classRegisterVOList.add(toClassRegisterVO(item));
        }
        return classRegisterVOList;
    }


}
