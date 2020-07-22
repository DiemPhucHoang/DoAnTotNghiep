package com.example.trungtamgiasu.parsing;

import com.example.trungtamgiasu.model.Tutor;
import com.example.trungtamgiasu.vo.Tutor.TutorByUserVO;
import com.example.trungtamgiasu.vo.Tutor.TutorInfoVO;
import com.example.trungtamgiasu.vo.Tutor.TutorRatingVO;
import com.example.trungtamgiasu.vo.Tutor.TutorVO;

import java.util.List;
public interface TutorParsing {
    Tutor toTutor(TutorVO tutorVO);

    Tutor toTutorByTutorInfoVO(TutorInfoVO tutorInfoVO);

    TutorVO toTutorVO(Tutor tutor);

    TutorInfoVO toTutorInfoVO(Tutor tutor);

    TutorByUserVO toTutorByUserVO(Tutor tutor);

    List<TutorInfoVO> toTutorsInfoVOList(List<Tutor> tutorsList);

    List<Tutor> toTutorsList(List<TutorVO> tutorsVOList);

    List<Tutor> toTutorsListByTutorsInfoVO(List<TutorInfoVO> tutorInfoVOS);

    byte[] readBytesFromFile(Long idTutor);

    TutorRatingVO toTutorRatingVO(Tutor tutor);

    List<TutorRatingVO> toTutorRatingVOList(List<Tutor> tutors);
}
