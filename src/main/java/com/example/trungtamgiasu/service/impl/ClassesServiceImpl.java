package com.example.trungtamgiasu.service.impl;

import com.example.trungtamgiasu.dao.*;
import com.example.trungtamgiasu.exception.BadRequestException;
import com.example.trungtamgiasu.exception.ResourceNotFoundException;
import com.example.trungtamgiasu.mapper.ClassesMapper;
import com.example.trungtamgiasu.model.*;
import com.example.trungtamgiasu.service.ClassesService;
import com.example.trungtamgiasu.vo.classes.ClassesVO;
import com.example.trungtamgiasu.vo.payload.ApiResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClassesServiceImpl implements ClassesService {
    Logger logger = LoggerFactory.getLogger(this.getClass().getName());

    @Autowired
    private ClassesMapper classesMapper;

    @Autowired
    private ClassesDAO classesDAO;

    @Autowired
    private UserDAO userDAO;

    @Autowired
    private RoleDAO roleDAO;

    @Autowired
    private TutorDAO tutorDAO;

    @Autowired
    private ParentRegisterTutorDAO parentRegisterTutorDAO;

    @Override
    public Classes createClass(ClassesVO classesVO) {
        logger.info("Create class");
        if(classesVO == null) {
            throw new BadRequestException("Class is null");
        }
        Classes classMap = classesMapper.toClasses(classesVO);
        ClassesStatus classesStatus = ClassesStatus.LOPMOI;
        classMap.setStatus(classesStatus);
        if (userDAO.existsByPhone(classesVO.getPhone())) {
            throw new BadRequestException("Phone is already use!");
        }
        User userInfo = new User(classesVO.getName(), classesVO.getPhone(), classesVO.getEmail());
        RoleName roleName = RoleName.ROLE_PARENT;
        Role role = roleDAO.findByName(roleName).orElseThrow(() -> new BadRequestException("Role does not exists"));
        userInfo.getRoles().add(role);
        User user =  userDAO.save(userInfo);
        classMap.setUser(user);
        Classes classes = classesDAO.save(classMap);

        ParentRegisterTutorStatus status = ParentRegisterTutorStatus.CHUADONGY;
        ClassesStatus statusRegisterTutor = ClassesStatus.CHOXACNHAN;
        if(classesVO.getIdTutors() != null) {
            for (Long id : classesVO.getIdTutors()) {
                Tutor tutorInfo = tutorDAO.findById(id).orElseThrow(() ->
                        new ResourceNotFoundException("Tutor", "id", id));
                ParentRegisterTutorKey key = new ParentRegisterTutorKey(user.getId(), id);
                ParentRegisterTutor parentRegisterTutorInfo = new ParentRegisterTutor
                        (key, user, tutorInfo, classes.getId(), status);
                parentRegisterTutorDAO.save(parentRegisterTutorInfo);
            }
            classes.setStatus(statusRegisterTutor);
        }
        return classesDAO.save(classes);
    }

    @Override
    public List<ClassesVO> getAll() {
        logger.info("Get all classes");
        ClassesStatus classesStatus = ClassesStatus.LOPMOI;
        List<Classes> classesList = classesDAO.findByStatus(classesStatus);
        return classesMapper.toClassesVOList(classesList);
    }
}
