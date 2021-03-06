package com.example.trungtamgiasu.service.impl;

import com.example.trungtamgiasu.dao.ClassesDAO;
import com.example.trungtamgiasu.dao.ParentRegisterTutorDAO;
import com.example.trungtamgiasu.dao.TutorDAO;
import com.example.trungtamgiasu.dao.TutorRegisterClassDAO;
import com.example.trungtamgiasu.model.Classes;
import com.example.trungtamgiasu.model.ParentRegisterTutor;
import com.example.trungtamgiasu.model.Tutor;
import com.example.trungtamgiasu.model.TutorRegisterClass;
import com.example.trungtamgiasu.model.enums.ClassesStatus;
import com.example.trungtamgiasu.model.enums.ParentRegisterTutorStatus;
import com.example.trungtamgiasu.model.enums.TutorRegisterClassStatus;
import com.example.trungtamgiasu.service.InvoiceService;
import com.example.trungtamgiasu.service.ParentRegisterTutorService;
import com.example.trungtamgiasu.vo.ParentRegisterTutor.ParentRegisterTutorVO;
import com.example.trungtamgiasu.vo.ParentRegisterTutor.TutorDetailVO;
import com.example.trungtamgiasu.vo.TutorRegisterClass.ClassTutorVO;
import com.example.trungtamgiasu.vo.invoice.InvoiceVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

import static java.util.Comparator.comparing;
import static java.util.stream.Collectors.collectingAndThen;
import static java.util.stream.Collectors.toCollection;

@Service
public class ParentRegisterTutorServiceImpl implements ParentRegisterTutorService {

    @Autowired
    private ParentRegisterTutorDAO parentRegisterTutorDAO;

    @Autowired
    private ClassesDAO classesDAO;

    @Autowired
    private TutorDAO tutorDAO;

    @Autowired
    private TutorRegisterClassDAO tutorRegisterClassDAO;

    @Autowired
    private InvoiceService invoiceService;

    @Autowired
    private AdminService adminService;

    @Override
    public Page<ParentRegisterTutorVO> findAll(Pageable pageable) {
        List<ParentRegisterTutorVO> parentRegisterTutorVOS = new ArrayList<>();
        List<ParentRegisterTutor> parentRegisterTutors = parentRegisterTutorDAO.findAll();

        for (ParentRegisterTutor parent: parentRegisterTutors) {
            int noTutor = parentRegisterTutorDAO.findAllByClass(parent.getIdClass()).size();
            Classes classes = classesDAO.findById(parent.getIdClass()).get();
            String status = "Chưa duyệt";
            if (classes.getStatus() == ClassesStatus.LOPDAGIAO) {
                status = "Đã duyệt";
            }

            ParentRegisterTutorVO parentRegisterTutorVO = new ParentRegisterTutorVO();
            parentRegisterTutorVO.setNameParent(parent.getUser().getName());
            parentRegisterTutorVO.setIdClass(parent.getIdClass());
            parentRegisterTutorVO.setClassTeach(classes.getClassTeach());
            parentRegisterTutorVO.setSubject(classes.getSubject());
            parentRegisterTutorVO.setDistrict(classes.getDistrict());
            parentRegisterTutorVO.setNoTutor(noTutor);
            parentRegisterTutorVO.setStatus(status);
            parentRegisterTutorVO.setTime(parent.getTime());

            parentRegisterTutorVOS.add(parentRegisterTutorVO);
        }

        List<ParentRegisterTutorVO> parentRegisterTutorVOList = parentRegisterTutorVOS.stream()
                .collect(collectingAndThen(toCollection(() -> new TreeSet<>(comparing(ParentRegisterTutorVO::getIdClass))),
                        ArrayList::new));

        parentRegisterTutorVOList = parentRegisterTutorVOList.stream()
                .sorted(Comparator.comparing(ParentRegisterTutorVO::getTime).reversed())
                .collect(Collectors.toList());

        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), parentRegisterTutorVOList.size());
        Page<ParentRegisterTutorVO> page = new PageImpl<>
                (parentRegisterTutorVOList.subList(start, end), pageable, parentRegisterTutorVOList.size());
        return page;
    }

    @Override
    public Page<TutorDetailVO> getListTutorByIdClass(Long idClass, Pageable pageable) {

        List<TutorDetailVO> tutorDetailVOS = new ArrayList<>();

        List<ParentRegisterTutor> parentRegisterTutors = parentRegisterTutorDAO.findAllByClass(idClass);
        for (ParentRegisterTutor parentRegisterTutor: parentRegisterTutors) {
            int score = adminService.compare(idClass, parentRegisterTutor.getTutor().getId());
            tutorDetailVOS.add(new TutorDetailVO(parentRegisterTutor, score));
        }

        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), tutorDetailVOS.size());
        Page<TutorDetailVO> tutorDetailVOPage = new PageImpl<>
                (tutorDetailVOS.subList(start, end), pageable, tutorDetailVOS.size());
        return tutorDetailVOPage;
    }

    public void updateStatusParentRegisterTutor(Long idClass, Long idTutor) throws Exception {
        ParentRegisterTutor parentRegisterTutor = parentRegisterTutorDAO.findByClassAndTutor(idClass, idTutor);
        if (parentRegisterTutor == null) {
            throw new Exception("parentRegisterTutor not found with idClass: " + idClass + "and idTutor: " + idTutor);
        }
        parentRegisterTutor.setStatus(ParentRegisterTutorStatus.DADONGY);
        parentRegisterTutorDAO.save(parentRegisterTutor);

        Classes classes = classesDAO.findById(idClass).orElse(null);

        if (classes != null) {
            classes.setStatus(ClassesStatus.LOPDAGIAO);
            classesDAO.save(classes);
        }

        Tutor tutor = tutorDAO.findById(idTutor).get();

        TutorRegisterClass tutorRegisterClass = new TutorRegisterClass();
        tutorRegisterClass.setClasses(classes);
        tutorRegisterClass.setTutor(tutor);
        tutorRegisterClass.setStatus(TutorRegisterClassStatus.DANHANLOP_PARENT);

        TutorRegisterClass registerClass = tutorRegisterClassDAO.save(tutorRegisterClass);

        InvoiceVO invoiceVO = new InvoiceVO();
        invoiceVO.setServiceFee(classes.getTuitionFee() * 0.25);
        invoiceVO.setIdTutorRegisterClass(registerClass.getId());
        invoiceVO.setTime(new Date());
        invoiceService.save(invoiceVO);

        List<ParentRegisterTutor> parentRegisterTutors = parentRegisterTutorDAO.findAllByClass(idClass);
        for(ParentRegisterTutor registerTutor: parentRegisterTutors) {
            if (registerTutor.getTutor().getId() != idTutor) {
                registerTutor.setStatus(ParentRegisterTutorStatus.KHONGDONGY);
                parentRegisterTutorDAO.save(registerTutor);
            }
        }
    }
}
