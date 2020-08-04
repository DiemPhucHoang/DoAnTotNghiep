package com.example.trungtamgiasu.service.impl;

import com.example.trungtamgiasu.dao.ClassesDAO;
import com.example.trungtamgiasu.dao.TutorDAO;
import com.example.trungtamgiasu.dao.TutorRegisterClassDAO;
import com.example.trungtamgiasu.dao.UserDAO;
import com.example.trungtamgiasu.exception.BadRequestException;
import com.example.trungtamgiasu.exception.ResourceNotFoundException;
import com.example.trungtamgiasu.model.*;
import com.example.trungtamgiasu.model.enums.ClassesStatus;
import com.example.trungtamgiasu.model.enums.TutorRegisterClassStatus;
import com.example.trungtamgiasu.parsing.TutorRegisterClassParsing;
import com.example.trungtamgiasu.security.UserPrincipal;
import com.example.trungtamgiasu.service.InvoiceService;
import com.example.trungtamgiasu.service.TutorRegisterClassService;
import com.example.trungtamgiasu.vo.TutorRegisterClass.*;
import com.example.trungtamgiasu.vo.invoice.InvoiceVO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class TutorRegisterClassServiceImpl implements TutorRegisterClassService {
    Logger logger = LoggerFactory.getLogger(this.getClass().getName());

    @Autowired
    private UserDAO userDAO;

    @Autowired
    private TutorDAO tutorDAO;

    @Autowired
    private ClassesDAO classesDAO;

    @Autowired
    private TutorRegisterClassDAO tutorRegisterClassDAO;

    @Autowired
    private TutorRegisterClassParsing tutorRegisterClassParsing;

    @Autowired
    private InvoiceService invoiceService;

    @Override
    public TutorRegisterClass saveTutorRegisterClass(TutorRegisterClass registerClass) {
        logger.info("Save register class");
        return tutorRegisterClassDAO.save(registerClass);
    }

    @Override
    public TutorRegisterClassInfoVO createTutorRegisterClass(TutorRegisterClassVO tutorRegisterClassVO, Long idClass, Authentication auth) {
        logger.info("Save tutor register class");
        UserPrincipal userPrincipal = (UserPrincipal) auth.getPrincipal();
        User user = userDAO.findByPhone(userPrincipal.getPhone()).orElseThrow(() ->
                new UsernameNotFoundException("User not found with phone: " + userPrincipal.getPhone()));
        Tutor tutor = tutorDAO.findByUser(user).orElseThrow(()
                -> new BadRequestException("Tutor is not found with user" + user.getId()));
        Classes classes = classesDAO.findById(idClass).orElseThrow(() ->
                new ResourceNotFoundException("Class", "id", idClass));
        List<TutorRegisterClass> tutorRegisterClassList = tutorRegisterClassDAO.getAllByClasses(idClass);
        //check tutor has already registered and check max tutor can register
        if(tutorRegisterClassList.size() > 0)
        {
            for (TutorRegisterClass item: tutorRegisterClassList) {
                if (item.getTutor().getId().equals(tutor.getId()))
                {
                    throw new BadRequestException("Tutor is already registered. Can not register class " + idClass);
                }
            }
            if(tutorRegisterClassList.size() >= 5)
            {
                throw new BadRequestException("Five tutors were registered. Can not register class " + idClass);
            }
        }
        logger.info("Tutor " + tutor.getId() + " register " + "class" + idClass);
        TutorRegisterClassStatus status =TutorRegisterClassStatus.XEMXET;
        tutorRegisterClassVO.setStatus(status.getKey());
        TutorRegisterClass classRegister = tutorRegisterClassParsing.toTutorRegisterClass(tutorRegisterClassVO);
        classRegister.setTutor(tutor);
        classRegister.setClasses(classes);
        return tutorRegisterClassParsing.toTutorRegisterClassInfoVO(saveTutorRegisterClass(classRegister));
    }

    @Override
    public List<ClassRegisterVO> getAllClassRegister(Long idUser) {
        User user = userDAO.findById(idUser).orElseThrow(() ->
                new ResourceNotFoundException("User", "id", idUser));
        Tutor tutor = tutorDAO.findByUser(user).orElseThrow(() ->
                new ResourceNotFoundException("Tutor", "idUser", user.getId()));
        logger.info("Get all Class register by tutor " + tutor.getId());
        List<TutorRegisterClass> tutorRegisterClassList = tutorRegisterClassDAO.getAllByTutors(tutor.getId());
        return tutorRegisterClassParsing.toClassRegisterVOList(tutorRegisterClassList);
    }

    @Override
    public Page<TutorRegisterClassInfoVO> getAllTutorRegisterClass(Long idClass, Pageable pageable) {
        logger.info("Get all tutor register class " + idClass);
        List<TutorRegisterClass> tutorRegisterClassList = tutorRegisterClassDAO.getAllByClasses(idClass);
        List<TutorRegisterClassInfoVO> array = tutorRegisterClassParsing.toTutorRegisterClassInfoVOList(tutorRegisterClassList);
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), tutorRegisterClassList.size());
        Page<TutorRegisterClassInfoVO> tutorRegisterClassInfoVOS = new PageImpl<>
                (array.subList(start, end), pageable, array.size());
        return  tutorRegisterClassInfoVOS;
    }

    @Override
    public void changeStatusTutorRegisterClass(Long id) {
        logger.info("Change status tutor register class with id_register " + id);
        TutorRegisterClass tutorRegisterClass = tutorRegisterClassDAO.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Tutor register class", "id", id));
        System.out.println("status" + tutorRegisterClass.getStatus());
        if(tutorRegisterClass.getStatus().equals(TutorRegisterClassStatus.XEMXET)) {
            tutorRegisterClassDAO.changeStatusClassRegister
                    (String.valueOf(TutorRegisterClassStatus.DAHUY.ordinal()), tutorRegisterClass.getId());
        } else {
            throw new BadRequestException("Can not change status");
        }
    }

    @Override
    public Page<ClassTutorVO> getAllTutorClassRegister(Pageable pageable) {
        List<ClassTutorVO> classTutorVOS = new ArrayList<>();

        List<TutorRegisterClass> tutorRegisterClasses = tutorRegisterClassDAO.findAll();

        for (int i=0; i<tutorRegisterClasses.size(); i++) {
            if(tutorRegisterClasses.get(i).getStatus() == null){
                tutorRegisterClasses.remove(i);
            }
        }

        for(int i=0; i<tutorRegisterClasses.size(); i++) {
            for(int j=i; j<tutorRegisterClasses.size(); j++) {
                if(tutorRegisterClasses.get(i).getClasses().getId() == tutorRegisterClasses.get(j).getClasses().getId()) {
                    tutorRegisterClasses.remove(i);
                }
            }
        }

        List<TutorRegisterClass> sortedTutorRegisterClass = tutorRegisterClasses.stream()
                .sorted(Comparator.comparing(TutorRegisterClass::getTime).reversed())
                .collect(Collectors.toList());

        for(TutorRegisterClass tutorRegisterClass: sortedTutorRegisterClass) {
            String status = "Chưa duyệt";
            int noTutor = tutorRegisterClassDAO.getAllTutorRegisterByClasses(tutorRegisterClass.getClasses().getId()).size();

            if (tutorRegisterClass.getClasses().getStatus() == ClassesStatus.LOPDAGIAO) {
                status = "Đã duyệt";
            }
            classTutorVOS.add(new ClassTutorVO(tutorRegisterClass, noTutor, status));
        }

        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), classTutorVOS.size());
        Page<ClassTutorVO> classTutorVOPage = new PageImpl<>
                (classTutorVOS.subList(start, end), pageable, classTutorVOS.size());
        return classTutorVOPage;
    }

    @Override
    public Page<TutorRegisterDetailVO> getListTutorRegisterClassByIdClass(Long idClass, Pageable pageable) {
        List<TutorRegisterDetailVO> tutorRegisterDetailVOS = new ArrayList<>();

        List<TutorRegisterClass> tutorRegisterClasses = tutorRegisterClassDAO.getAllTutorRegisterByClasses(idClass);
        for (TutorRegisterClass tutorRegisterClass: tutorRegisterClasses) {
            tutorRegisterDetailVOS.add(new TutorRegisterDetailVO(tutorRegisterClass));
        }

        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), tutorRegisterDetailVOS.size());
        Page<TutorRegisterDetailVO> tutorRegisterDetailVOPage = new PageImpl<>
                (tutorRegisterDetailVOS.subList(start, end), pageable, tutorRegisterDetailVOS.size());
        return tutorRegisterDetailVOPage;
    }

    @Override
    public void updateStatusTutorRegisterClass(Long idTutorRegisterClass) throws Exception {
        TutorRegisterClass tutorRegisterClass = tutorRegisterClassDAO.findById(idTutorRegisterClass).orElse(null);
        if (tutorRegisterClass == null) {
            throw new Exception("tutorRegisterClass not found with id: " + idTutorRegisterClass);
        }
        tutorRegisterClass.setStatus(TutorRegisterClassStatus.DANHANLOP);
        tutorRegisterClassDAO.save(tutorRegisterClass);

        Long idClass = tutorRegisterClass.getClasses().getId();
        Classes classes = classesDAO.findById(idClass).orElse(null);

        InvoiceVO invoiceVO = new InvoiceVO();
        invoiceVO.setServiceFee(classes.getTuitionFee() * 0.25);
        invoiceVO.setIdTutorRegisterClass(idTutorRegisterClass);
        invoiceVO.setTime(new Date());
        invoiceService.save(invoiceVO);

        if (classes != null) {
            classes.setStatus(ClassesStatus.LOPDAGIAO);
            classesDAO.save(classes);
        }

        List<TutorRegisterClass> tutorRegisterClasses = tutorRegisterClassDAO.getAllTutorRegisterByClasses(idClass);
        for(TutorRegisterClass registerClass: tutorRegisterClasses) {
            if (registerClass.getId() != idTutorRegisterClass) {
                registerClass.setStatus(TutorRegisterClassStatus.KHONGDAT);
                tutorRegisterClassDAO.save(registerClass);
            }
        }
    }
}