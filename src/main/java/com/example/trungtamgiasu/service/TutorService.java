package com.example.trungtamgiasu.service;

import com.example.trungtamgiasu.model.*;
import com.example.trungtamgiasu.vo.FreeTime.FreeTimeVO;
import com.example.trungtamgiasu.vo.SearchVO;
import com.example.trungtamgiasu.vo.Tutor.TutorDetailVO;
import com.example.trungtamgiasu.vo.Tutor.TutorInfoVO;
import com.example.trungtamgiasu.vo.Tutor.TutorRatingVO;
import com.example.trungtamgiasu.vo.Tutor.TutorVO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Set;

public interface TutorService {

    Page<TutorInfoVO> getAllByPage(Pageable pageable);

    Tutor saveTutor(Tutor tutor);

    Tutor createTutor(TutorVO tutorVO, Long idUser);

    Page<TutorInfoVO> searchTutor(SearchVO searchVO, Pageable pageable);

    TutorDetailVO getTutorById(Long id);

    List<Tutor> getSimilarTutors(Long idTutor);

    Tutor getTutorByIdUser(Long idUser);

    List<TutorInfoVO> getTop4Tutors();

    TutorInfoVO changeInfoTutor(TutorVO tutorVO, Long idTutor);

    boolean checkExistFreeTime(FreeTime freeTimeFirst, FreeTime freeTimeSecond);

    Set<Subject> updateSubjects(Long[] subjects);

    Set<District> updateDistricts(Long[] districts);

    Set<ClassTeach> updateClassTeaches(Long[] classTeaches);

    Set<FreeTime> updateFreeTimes(FreeTimeVO[] freeTimeVOS);

    List<TutorRatingVO> getAllTutorRegisterClassOfParent(String phone);
}
