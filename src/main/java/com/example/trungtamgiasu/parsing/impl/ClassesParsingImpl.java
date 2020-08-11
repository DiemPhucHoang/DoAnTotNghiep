package com.example.trungtamgiasu.parsing.impl;

import com.example.trungtamgiasu.model.Classes;
import com.example.trungtamgiasu.model.enums.ClassesStatus;
import com.example.trungtamgiasu.parsing.ClassesParsing;
import com.example.trungtamgiasu.vo.classes.ClassesInfoVO;
import com.example.trungtamgiasu.vo.classes.ClassesVO;
import org.springframework.stereotype.Component;

import java.text.Format;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

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
            classes.setStatus(ClassesStatus.from(classesVO.getStatus()));
            classes.setNoDay(classesVO.getNoDay());
            classes.setNoHour(classesVO.getNoHour());
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
            classesVO.setStatus(classes.getStatus().getKey());
            classesVO.setNoDay(classes.getNoDay());
            classesVO.setNoHour(classes.getNoHour());
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
            classesInfoVO.setStatus(classes.getStatus().getKey());
            if(classes.getTime() != null) {
                Format formatter = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
                String s = formatter.format(classes.getTime());
                classesInfoVO.setTime(s);
            }
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
        List<Classes> sortedClasses = classesList.stream()
                .sorted(Comparator.comparing(Classes::getTime).reversed())
                .collect(Collectors.toList());
        for (Classes classes : sortedClasses) {
            classesInfoVOList.add(toClassesInfoVO(classes));
        }
        return classesInfoVOList;
    }

    @Override
    public Classes parseClassesInfoVOToEntity(ClassesInfoVO classesInfoVO) throws Exception {
        if (classesInfoVO == null) {
            throw new Exception("Invalid classesInfoVO");
        }

        ClassesStatus classesStatus = null;
        if (classesInfoVO.getStatus() != null) {
            classesStatus = ClassesStatus.from(classesInfoVO.getStatus());
            if (classesStatus == null) {
                throw new Exception ("Value " + classesInfoVO.getStatus() + " is invalid value");
            }
        }

        return new Classes(classesInfoVO.getId(), classesInfoVO.getClassTeach(), classesInfoVO.getSubject(), classesInfoVO.getLevelRequirement(),
                classesInfoVO.getGenderRequirement(), classesInfoVO.getDistrict(), classesInfoVO.getTimeTeach(), classesInfoVO.getAddress(),
                classesInfoVO.getTuitionFee(), classesStatus);
    }
}


