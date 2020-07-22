package com.example.trungtamgiasu.service;

import com.example.trungtamgiasu.model.Classes;
import com.example.trungtamgiasu.vo.SearchVO;
import com.example.trungtamgiasu.vo.classes.ClassesInfoVO;
import com.example.trungtamgiasu.vo.classes.ClassesVO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ClassesService {
    Classes createClass(ClassesVO classesVO);

    Page<ClassesInfoVO> getAll(Pageable pageable);

    Page<ClassesInfoVO> searchClasses(SearchVO searchVO, Pageable pageable);

    ClassesInfoVO getClassesById(Long id);
    
    List<ClassesInfoVO> getTop4();

    List<ClassesInfoVO> getTop3ByClassTeach(Long idClass);

    List<ClassesInfoVO> getClassesSuggest(Long idUser);
}
