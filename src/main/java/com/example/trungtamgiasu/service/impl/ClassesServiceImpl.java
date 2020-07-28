package com.example.trungtamgiasu.service.impl;

import com.example.trungtamgiasu.dao.*;
import com.example.trungtamgiasu.exception.BadRequestException;
import com.example.trungtamgiasu.exception.ResourceNotFoundException;
import com.example.trungtamgiasu.model.*;
import com.example.trungtamgiasu.model.enums.ClassesStatus;
import com.example.trungtamgiasu.model.enums.ParentRegisterTutorStatus;
import com.example.trungtamgiasu.model.enums.RoleName;
import com.example.trungtamgiasu.parsing.ClassesParsing;
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

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@Service
public class ClassesServiceImpl implements ClassesService {
    Logger logger = LoggerFactory.getLogger(this.getClass().getName());

    @Autowired
    private ClassesParsing classesParsing;

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
        classesVO.setStatus(ClassesStatus.LOPMOI.getKey());
        User user;
        if (userDAO.existsByPhone(classesVO.getPhone())) {
            user = userDAO.findByPhone(classesVO.getPhone()).orElseThrow(() ->
                    new ResourceNotFoundException("User", "phone", classesVO.getPhone()));
        } else {
            User userInfo = new User(classesVO.getName(), classesVO.getPhone(), classesVO.getEmail());
            RoleName roleName = RoleName.ROLE_PARENT;
            Role role = roleDAO.findByName(roleName).orElseThrow(() -> new BadRequestException("Role does not exists"));
            userInfo.getRoles().add(role);
            user =  userDAO.save(userInfo);
        }
        Classes classMap = classesParsing.toClasses(classesVO);
        classMap.setUser(user);
        Classes classes = classesDAO.save(classMap);
        ParentRegisterTutorStatus status = ParentRegisterTutorStatus.CHUADONGY;
        ClassesStatus statusRegisterTutor = ClassesStatus.CHOXACNHAN;
        if(classesVO.getIdTutors() != null && classesVO.getIdTutors().length > 0) {
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
        List<ClassesInfoVO> classesInfoVOS = classesParsing.toClassesInfoVOList(classesList);
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), classesInfoVOS.size());
        Page<ClassesInfoVO> classesInfoVOPage = new PageImpl<>
                (classesInfoVOS.subList(start, end), pageable, classesInfoVOS.size());
        return classesInfoVOPage;
    }

    @Override
    public Page<ClassesInfoVO> searchClasses(SearchVO searchVO, Pageable pageable) {
        logger.info("Search classes");
        if(searchVO == null) {
            throw new BadRequestException("SearchVO is not found");
        }
        List<Classes> classesList = classesDAO.findAll(Objects.requireNonNull(Objects.requireNonNull(Objects.
                requireNonNull(Specification.
                where(ClassesSpecification.withSubject(searchVO.getSubject(), ClassesStatus.LOPMOI))
                .and(ClassesSpecification.withClassTeach(searchVO.getClassTeach(), ClassesStatus.LOPMOI)))
                .and(ClassesSpecification.withDistrict(searchVO.getDistrict(), ClassesStatus.LOPMOI)))
                .and(ClassesSpecification.withLevel(searchVO.getLevel(), ClassesStatus.LOPMOI)))
                .and(ClassesSpecification.withGender(searchVO.getGender(), ClassesStatus.LOPMOI)));
        List<ClassesInfoVO> classesInfoVOS = classesParsing.toClassesInfoVOList(classesList);
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
        return classesParsing.toClassesInfoVO(classes);
    }

    @Override
    public List<ClassesInfoVO> getTop4() {
        logger.info("Get top 4 classes");
        List<Classes> classesList = classesDAO.findTop4ByStatusOrderByTuitionFeeDesc(ClassesStatus.LOPMOI);
        return classesParsing.toClassesInfoVOList(classesList);
    }

    @Override
    public List<ClassesInfoVO> getTop3ByClassTeach(Long idClass) {
        Classes classes = classesDAO.findById(idClass).orElseThrow(() ->
                new ResourceNotFoundException("Class", "id", idClass));
        logger.info("Get top 3 classes by class teach " + classes.getClassTeach());
        List<Classes> classesList = classesDAO.getTop3Similar(classes.getClassTeach(), idClass);
        return classesParsing.toClassesInfoVOList(classesList);
    }

    @Override
    public List<ClassesInfoVO> getClassesSuggest(Long idUser) {
        logger.info("Get classes suggest by id user " + idUser);
        Tutor tutor = tutorDAO.findByUser(userDAO.findById(idUser).
                orElseThrow(() -> new ResourceNotFoundException("User", "id ", idUser))).
                orElseThrow(() -> new ResourceNotFoundException("Tutor", "id",idUser));
        Set<ClassTeach> classTeaches = tutor.getClassTeaches();
        Set<District> districts = tutor.getDistricts();
        List<Classes> result = new ArrayList<>();
        ClassesStatus classesStatus = ClassesStatus.LOPMOI;
        for (ClassTeach classTeach : classTeaches) {
            for (District district : districts) {
                result.addAll(classesDAO.findTop6ByClassTeachAndDistrictAndStatus
                        (classTeach.getClassTeachName(), district.getDistrictName(), classesStatus));
            }
        }
        return classesParsing.toClassesInfoVOList(result);
    }
}