package com.example.trungtamgiasu.service;

import com.example.trungtamgiasu.model.Classes;
import com.example.trungtamgiasu.vo.classes.ClassesVO;

import java.util.List;

public interface ClassesService {
    Classes createClass(ClassesVO classesVO);

    List<ClassesVO> getAll();
}
