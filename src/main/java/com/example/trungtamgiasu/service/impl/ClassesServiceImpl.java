package com.example.trungtamgiasu.service.impl;

import com.example.trungtamgiasu.dao.*;
import com.example.trungtamgiasu.exception.BadRequestException;
import com.example.trungtamgiasu.exception.ResourceNotFoundException;
import com.example.trungtamgiasu.mapper.ClassesMapper;
import com.example.trungtamgiasu.model.*;
import com.example.trungtamgiasu.model.enums.ClassesStatus;
import com.example.trungtamgiasu.model.enums.ParentRegisterTutorStatus;
import com.example.trungtamgiasu.model.enums.RoleName;
import com.example.trungtamgiasu.service.ClassesService;
import com.example.trungtamgiasu.specification.ClassesSpecification;
import com.example.trungtamgiasu.vo.SearchVO;
import com.example.trungtamgiasu.vo.classes.ClassesInfoVO;
import com.example.trungtamgiasu.vo.classes.ClassesVO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

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
    public Page<ClassesInfoVO> getAll(Pageable pageable) {
        logger.info("Get all classes");
        ClassesStatus classesStatus = ClassesStatus.LOPMOI;
        List<Classes> classesList = classesDAO.findByStatus(classesStatus);
        List<ClassesInfoVO> classesInfoVOS = classesMapper.toClassesInfoVOList(classesList);
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), classesInfoVOS.size());
        Page<ClassesInfoVO> classesInfoVOPage = new PageImpl<>
                (classesInfoVOS.subList(start, end), pageable, classesInfoVOS.size());
        return classesInfoVOPage;
    }

    @Override
    public Page<ClassesInfoVO> searchClasses(SearchVO searchVO, Pageable pageable) {
        logger.info("Search classes");
        List<Classes> classesList = classesDAO.findAll(Objects.requireNonNull(Objects.requireNonNull(Objects.requireNonNull(Specification.
                where(ClassesSpecification.withSubject(searchVO.getSubject(), ClassesStatus.LOPMOI))
                .and(ClassesSpecification.withClassTeach(searchVO.getClassTeach(), ClassesStatus.LOPMOI)))
                .and(ClassesSpecification.withDistrict(searchVO.getDistrict(), ClassesStatus.LOPMOI)))
                .and(ClassesSpecification.withLevel(searchVO.getLevel(), ClassesStatus.LOPMOI)))
                .and(ClassesSpecification.withGender(searchVO.getGender(), ClassesStatus.LOPMOI)));
        List<ClassesInfoVO> classesInfoVOS = classesMapper.toClassesInfoVOList(classesList);
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), classesInfoVOS.size());
        Page<ClassesInfoVO> classesInfoVOPage = new PageImpl<>
                (classesInfoVOS.subList(start, end), pageable, classesInfoVOS.size());
        return classesInfoVOPage;
    }

    @Override
    public ClassesInfoVO getClassesById(Long id) {
        logger.info("Get class by id " + id);
        Classes classes = classesDAO.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Class", "id", id));
        return classesMapper.toClassesInfoVO(classes);
    }
}
