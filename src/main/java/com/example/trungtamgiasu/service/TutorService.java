package com.example.trungtamgiasu.service;

import com.example.trungtamgiasu.model.*;
import com.example.trungtamgiasu.vo.FreeTime.FreeTimeVO;
import com.example.trungtamgiasu.vo.SearchVO;
import com.example.trungtamgiasu.vo.Tutor.TutorInfoVO;
import com.example.trungtamgiasu.vo.Tutor.TutorVO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Set;

public interface TutorService {

    Page<TutorInfoVO> getAllByPage(Pageable pageable);

    Tutor saveTutor(Tutor tutor);

    boolean checkFileNameExist(String fileName, Long idUser);

    String changeFileNameIfExist(MultipartFile file, Long idUser);

    //??ko dung
    String uploadImage(MultipartFile file, Long idUser, Authentication auth);

    Tutor createTutor(TutorVO tutorVO, Long idUser);

    Page<TutorInfoVO> searchTutor(SearchVO searchVO, Pageable pageable);

    TutorInfoVO getTutorById(Long id);

    List<Tutor> getSimilarTutors(Long idTutor);

    Tutor getTutorByIdUser(Long idUser);

    String changeImage(Long idUser, MultipartFile file, Authentication auth);

    List<TutorInfoVO> getTop4Tutors();

    TutorInfoVO changeInfoTutor(TutorVO tutorVO, Long idTutor);

    boolean checkExistFreeTime(FreeTime freeTimeFirst, FreeTime freeTimeSecond);

    Set<Subject> updateSubjects(Long[] subjects);

    Set<District> updateDistricts(Long[] districts);

    Set<ClassTeach> updateClassTeaches(Long[] classTeaches);

    Set<FreeTime> updateFreeTimes(FreeTimeVO[] freeTimeVOS);
}
