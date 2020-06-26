package com.example.trungtamgiasu.mapper;

import com.example.trungtamgiasu.model.Tutor;
import com.example.trungtamgiasu.vo.Tutor.TutorInfoVO;
import com.example.trungtamgiasu.vo.Tutor.TutorVO;

import java.util.List;
public interface TutorMapper {
    Tutor toTutor(TutorVO tutorVO);

    Tutor toTutorByTutorInfoVO(TutorInfoVO tutorInfoVO);

    TutorVO toTutorVO(Tutor tutor);

    TutorInfoVO toTutorInfoVO(Tutor tutor);

    List<TutorInfoVO> toTutorsInfoVOList(List<Tutor> tutorsList);

    List<Tutor> toTutorsList(List<TutorVO> tutorsVOList);

    List<Tutor> toTutorsListByTutorsInfoVO(List<TutorInfoVO> tutorInfoVOS);

    byte[] readBytesFromFile(Long idTutor);
}
