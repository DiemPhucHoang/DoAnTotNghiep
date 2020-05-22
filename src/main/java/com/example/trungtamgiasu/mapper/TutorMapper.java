package com.example.trungtamgiasu.mapper;

import com.example.trungtamgiasu.model.Tutor;
import com.example.trungtamgiasu.vo.Tutor.TutorVO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TutorMapper {
    Tutor toTutor(TutorVO tutorVO);

    TutorVO toTutorVO(Tutor tutor);

}
