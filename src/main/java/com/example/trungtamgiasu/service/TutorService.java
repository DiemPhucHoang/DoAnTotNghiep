package com.example.trungtamgiasu.service;

import com.example.trungtamgiasu.model.Tutor;
import com.example.trungtamgiasu.vo.SearchVO;
import com.example.trungtamgiasu.vo.Tutor.TutorInfoVO;
import com.example.trungtamgiasu.vo.Tutor.TutorVO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface TutorService {
    List<TutorInfoVO> getAll();

    Page<TutorInfoVO> getAllByPage(Pageable pageable);

    Tutor saveTutor(Tutor tutor);

    boolean checkFileNameExist(String fileName, Long idUser);

    String changeFileNameIfExist(MultipartFile file, Long idUser);

    String uploadImage(MultipartFile file);

    Tutor createTutor(TutorVO tutorVO, Long idUser);

    Page<TutorInfoVO> searchTutor(SearchVO searchVO, Pageable pageable);

    Tutor getTutorById(Long id);

    List<Tutor> getSimilarTutors(Long idTutor);

    Tutor getTutorByIdUser(Long idUser);

    byte[] readBytesFromFile(Long idTutor);

    String changeImage(Long idUser, MultipartFile file, Authentication auth);

    



}
