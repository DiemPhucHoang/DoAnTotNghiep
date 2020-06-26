package com.example.trungtamgiasu.mapper;

import com.example.trungtamgiasu.model.Classes;
import com.example.trungtamgiasu.vo.classes.ClassesInfoVO;
import com.example.trungtamgiasu.vo.classes.ClassesVO;

import java.util.List;
public interface ClassesMapper {
    Classes toClasses(ClassesVO classesVO);

    ClassesVO toClassesVO(Classes classes);

    ClassesInfoVO toClassesInfoVO(Classes classes);

    List<ClassesVO> toClassesVOList(List<Classes> classes);

    List<ClassesInfoVO> toClassesInfoVOList(List<Classes> classes);



}
