package com.example.trungtamgiasu.parsing.impl;

import com.example.trungtamgiasu.model.Classes;
import com.example.trungtamgiasu.parsing.ClassesParsing;
import com.example.trungtamgiasu.vo.classes.ClassesInfoVO;
import com.example.trungtamgiasu.vo.classes.ClassesVO;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ClassesParsingImpl implements ClassesParsing {
    public ClassesParsingImpl() {
    }

    @Override
    public Classes toClasses(ClassesVO classesVO) {
        if(classesVO == null) {
            return null;
        } else {
            Classes classes = new Classes();
            classes.setId(classesVO.getId());
            classes.setClassTeach(classesVO.getClassTeach());
            classes.setSubject(classesVO.getSubject());
            classes.setLevelRequirement(classesVO.getLevelRequirement());
            classes.setGenderRequirement(classesVO.getGenderRequirement());
            classes.setDistrict(classesVO.getDistrict());
            classes.setTimeTeach(classesVO.getTimeTeach());
            classes.setAddress(classesVO.getAddress());
            classes.setTuitionFee(classesVO.getTuitionFee());
            classes.setStatus(classesVO.getClassesStatus());
            return classes;
        }

    }

    @Override
    public ClassesVO toClassesVO(Classes classes) {
        if (classes == null) {
            return null;
        } else {
            ClassesVO classesVO = new ClassesVO();
            classesVO.setId(classes.getId());
            classesVO.setClassTeach(classes.getClassTeach());
            classesVO.setSubject(classes.getSubject());
            classesVO.setLevelRequirement(classes.getLevelRequirement());
            classesVO.setGenderRequirement(classes.getGenderRequirement());
            classesVO.setDistrict(classes.getDistrict());
            classesVO.setTimeTeach(classes.getTimeTeach());
            classesVO.setAddress(classes.getAddress());
            classesVO.setTuitionFee(classes.getTuitionFee());
            classesVO.setClassesStatus(classes.getStatus());
            return classesVO;
        }
    }

    @Override
    public ClassesInfoVO toClassesInfoVO(Classes classes) {
        if(classes == null) {
            return null;
        } else {
            ClassesInfoVO classesInfoVO = new ClassesInfoVO();
            classesInfoVO.setId(classes.getId());
            classesInfoVO.setClassTeach(classes.getClassTeach());
            classesInfoVO.setSubject(classes.getSubject());
            classesInfoVO.setLevelRequirement(classes.getLevelRequirement());
            classesInfoVO.setGenderRequirement(classes.getGenderRequirement());
            classesInfoVO.setDistrict(classes.getDistrict());
            classesInfoVO.setTimeTeach(classes.getTimeTeach());
            classesInfoVO.setAddress(classes.getAddress());
            classesInfoVO.setTuitionFee(classes.getTuitionFee());
            classesInfoVO.setClassesStatus(classes.getStatus());
            return classesInfoVO;
        }
    }

    @Override
    public List<ClassesVO> toClassesVOList(List<Classes> classesList) {
        if (classesList == null) {
            return null;
        }
        List<ClassesVO> classesVOList = new ArrayList<>();
        for (Classes classes : classesList) {
            classesVOList.add(toClassesVO(classes));
        }
        return classesVOList;
    }

    @Override
    public List<ClassesInfoVO> toClassesInfoVOList(List<Classes> classesList) {
        if (classesList == null) {
            return null;
        }
        List<ClassesInfoVO> classesInfoVOList = new ArrayList<>();
        for (Classes classes : classesList) {
            classesInfoVOList.add(toClassesInfoVO(classes));
        }
        return classesInfoVOList;
    }
}