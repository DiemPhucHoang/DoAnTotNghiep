package com.example.trungtamgiasu.mapper;

import com.example.trungtamgiasu.model.ClassTeach;
import com.example.trungtamgiasu.vo.ClassTeach.ClassTeachVO;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ClassTeachMapper {

    ClassTeach toClassTeach(ClassTeachVO classTeachVO);

    ClassTeachVO toClassTeachVO(ClassTeach classTeach);

    List<ClassTeachVO> toClassTeachesVOList(List<ClassTeach> classTeaches);
}
