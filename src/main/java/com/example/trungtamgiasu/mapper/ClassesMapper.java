package com.example.trungtamgiasu.mapper;

import com.example.trungtamgiasu.model.Classes;
import com.example.trungtamgiasu.vo.classes.ClassesVO;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ClassesMapper {
    Classes toClasses(ClassesVO classesVO);

    ClassesVO toClassesVO(Classes classes);

    List<ClassesVO> toClassesVOList(List<Classes> classes);

}
