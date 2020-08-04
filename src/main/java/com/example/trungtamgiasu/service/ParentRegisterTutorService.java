package com.example.trungtamgiasu.service;

import com.example.trungtamgiasu.vo.ParentRegisterTutor.ParentRegisterTutorVO;
import com.example.trungtamgiasu.vo.ParentRegisterTutor.TutorDetailVO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ParentRegisterTutorService {
    Page<ParentRegisterTutorVO> findAll(Pageable pageable);

    Page<TutorDetailVO> getListTutorByIdClass(Long idClass, Pageable pageable);

    public void updateStatusParentRegisterTutor(Long idClass, Long idTutor) throws Exception;
}
