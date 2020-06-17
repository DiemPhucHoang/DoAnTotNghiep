package com.example.trungtamgiasu.mapper;

import com.example.trungtamgiasu.model.Subject;
import com.example.trungtamgiasu.vo.Subject.SubjectVO;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface SubjectMapper {

    Subject toSubject(SubjectVO subjectVO);

    SubjectVO toSubjectVO(Subject subject);

    List<SubjectVO> toSubjectsVOList(List<Subject> subjects);
}
