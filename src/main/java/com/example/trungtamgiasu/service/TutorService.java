package com.example.trungtamgiasu.service;

import com.example.trungtamgiasu.model.Tutor;
import com.example.trungtamgiasu.vo.Tutor.TutorVO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface TutorService {
    List<Tutor> getAll();

    Tutor saveTutor(Tutor tutor);

    boolean checkFileNameExist(String fileName, Long idUser);

    String changeFileNameIfExist(MultipartFile file, Long idUser);

    String uploadImage(MultipartFile file);

    Tutor createTutor(TutorVO tutorVO, Long idUser);


}
