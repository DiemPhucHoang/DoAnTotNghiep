package com.example.trungtamgiasu.parsing;

import com.example.trungtamgiasu.model.Classes;
import com.example.trungtamgiasu.vo.classes.ClassesInfoVO;
import com.example.trungtamgiasu.vo.classes.ClassesVO;

import java.util.List;
public interface ClassesParsing {
    Classes toClasses(ClassesVO classesVO);

    ClassesVO toClassesVO(Classes classes);

    ClassesInfoVO toClassesInfoVO(Classes classes);

    List<ClassesVO> toClassesVOList(List<Classes> classesList);

    List<ClassesInfoVO> toClassesInfoVOList(List<Classes> classesList);

    Classes parseClassesInfoVOToEntity(ClassesInfoVO classesInfoVO) throws Exception;

}
