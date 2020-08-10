package com.example.trungtamgiasu.service.impl;

import com.example.trungtamgiasu.dao.*;
import com.example.trungtamgiasu.exception.BadRequestException;
import com.example.trungtamgiasu.exception.ResourceNotFoundException;
import com.example.trungtamgiasu.mapper.FreeTimeMapper;
import com.example.trungtamgiasu.model.*;
import com.example.trungtamgiasu.model.enums.TutorStatus;
import com.example.trungtamgiasu.parsing.TutorParsing;
import com.example.trungtamgiasu.service.TutorService;
import com.example.trungtamgiasu.specification.TutorSpecification;
import com.example.trungtamgiasu.vo.FreeTime.FreeTimeVO;
import com.example.trungtamgiasu.vo.SearchVO;
import com.example.trungtamgiasu.vo.Tutor.TutorDetailVO;
import com.example.trungtamgiasu.vo.Tutor.TutorInfoVO;
import com.example.trungtamgiasu.vo.Tutor.TutorRatingVO;
import com.example.trungtamgiasu.vo.Tutor.TutorVO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class TutorServiceImpl implements TutorService {
    Logger logger = LoggerFactory.getLogger(this.getClass().getName());

    @Autowired
    private TutorDAO tutorDAO;

    @Autowired
    private DistrictDAO districtDAO;

    @Autowired
    private ClassTeachDAO classTeachDAO;

    @Autowired
    private FreeTimeDAO freeTimeDAO;

    @Autowired
    private SubjectDAO subjectDAO;

    @Autowired
    private UserDAO userDAO;

    @Autowired
    private TutorRegisterClassDAO tutorRegisterClassDAO;

    @Autowired
    private TutorParsing tutorParsing;

    @Autowired
    private FreeTimeMapper freeTimeMapper;

    @Override
    public Page<TutorInfoVO> getAllByPage(Pageable pageable) {
        List<Tutor> tutors = tutorDAO.findByStatus(TutorStatus.CHUANHANLOP);
        List<TutorInfoVO> tutorInfoVOS = tutorParsing.toTutorsInfoVOList(tutors);

        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), tutorInfoVOS.size());
        Page<TutorInfoVO> tutorInfoVOPage = new PageImpl<>
                (tutorInfoVOS.subList(start, end), pageable, tutorInfoVOS.size());
        return tutorInfoVOPage;
    }

    @Override
    public Tutor saveTutor(Tutor tutor) {
        logger.info("Save tutor");
        return tutorDAO.save(tutor);
    }

    @Override
    public Tutor createTutor(TutorVO tutorVO, Long idUser) {
        logger.info("Create tutor service");
        if(tutorVO == null) {
            throw new BadRequestException("Tutor is null");
        }
        User user = userDAO.findById(idUser).orElseThrow(() ->
                new ResourceNotFoundException("User", "id" , idUser));
        if(tutorDAO.existsByUser(user)) {
            throw new BadRequestException("Id user already exists");
        }
        tutorVO.setStatus(TutorStatus.CHUANHANLOP.getKey());
        Tutor tutorMap = tutorParsing.toTutor(tutorVO);
        tutorMap.setUser(userDAO.findById(idUser).
                orElseThrow(() -> new ResourceNotFoundException("User", "id", idUser)));
        //add table tutor_subject
        if(tutorVO.getSubject() != null) {
            for (Long idSubject : tutorVO.getSubject()) {
                tutorMap.getSubjects().add(subjectDAO.findById(idSubject)
                        .orElseThrow(() -> new BadRequestException("Subject " + idSubject + " does not exists")));
            }
        }
        //add table tutor_class_teach
        if(tutorVO.getClassTeach() != null) {
            for (Long idClassTeach : tutorVO.getClassTeach()) {
                tutorMap.getClassTeaches().add(classTeachDAO.findById(idClassTeach).
                        orElseThrow(() -> new BadRequestException("Class teach " + idClassTeach + "does not exists")));
            }
        }
        //add table tutor_district
        if(tutorVO.getDistrict() != null) {
            for (Long idDistrict : tutorVO.getDistrict()) {
                tutorMap.getDistricts().add(districtDAO.findById(idDistrict).
                        orElseThrow(() -> new BadRequestException("District " + idDistrict + "does not exists")));
            }
        }
        //add table tutor_free_time
        if(tutorVO.getFreeTime() != null) {
            List<FreeTime> freeTimeList = freeTimeDAO.findAll();
            for (FreeTimeVO freeTimeVO : tutorVO.getFreeTime()) {
                FreeTime freeTimeCheck = freeTimeMapper.toFreeTime(freeTimeVO);
                int dem = 0;
                for (FreeTime freeTime : freeTimeList) {
                    if(checkExistFreeTime(freeTime, freeTimeCheck)) {
                        tutorMap.getFreeTimes().add(freeTime);
                        dem++;
                        break;
                    }
                }
                if(dem == 0) {
                    FreeTime freeTime = freeTimeDAO.save(freeTimeMapper.toFreeTime(freeTimeVO));
                    tutorMap.getFreeTimes().add(freeTime);
                }
            }
        }
        return saveTutor(tutorMap);
    }

    @Override
    public Page<TutorInfoVO> searchTutor(SearchVO searchVO, Pageable pageable) {
        logger.info("Search tutor");
        List<Tutor> tutors = tutorDAO.findAll(Objects.requireNonNull(Objects.requireNonNull(Objects.requireNonNull(Specification.
                where(TutorSpecification.withSubject(searchVO.getSubject(), TutorStatus.CHUANHANLOP))
                .and(TutorSpecification.withClassTeach(searchVO.getClassTeach(), TutorStatus.CHUANHANLOP)))
                .and(TutorSpecification.withDistrict(searchVO.getDistrict(), TutorStatus.CHUANHANLOP)))
                .and(TutorSpecification.withLevel(searchVO.getLevel(), TutorStatus.CHUANHANLOP)))
                .and(TutorSpecification.withGender(searchVO.getGender(), TutorStatus.CHUANHANLOP)));
        List<TutorInfoVO> tutorInfoVOS = tutorParsing.toTutorsInfoVOList(tutors);
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), tutorInfoVOS.size());
        Page<TutorInfoVO> tutorInfoVOPage = new PageImpl<>
                (tutorInfoVOS.subList(start, end), pageable, tutorInfoVOS.size());
        return tutorInfoVOPage;
    }

    @Override
    public TutorDetailVO getTutorById(Long id) {
        logger.info("Get tutor by id " + id);
        List<TutorRegisterClass>  tutorRegisterClassList = tutorRegisterClassDAO.numberOfClassTeach(id);
        Tutor tutor = tutorDAO.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Tutor", "id", id));
        return new TutorDetailVO(tutorParsing.toTutorInfoVO(tutor), tutorRegisterClassList.size());

    }

    @Override
    public List<Tutor> getSimilarTutors(Long idTutor) {
        logger.info("Get similar tutor with id tutor " + idTutor);
        Tutor tutor = tutorParsing.toTutorByTutorInfoVO(getTutorById(idTutor).getTutorInfoVO());
        List<Tutor> tutors = new ArrayList<>();
        for (Subject subject : tutor.getSubjects()) {
            tutors.addAll(tutorDAO.findBySubjects_SubjectName(subject.getSubjectName()));
        }
        Set<Tutor> tutorSet = new LinkedHashSet<>(tutors);
        List<Tutor> tutorArrayList =  new ArrayList<>(tutorSet);
        tutorArrayList.remove(tutor);
        return tutorArrayList;
    }

    @Override
    public Tutor getTutorByIdUser(Long idUser) {
        logger.info("Get tutor by id " + idUser);
        return tutorDAO.findByUser(userDAO.findById(idUser).
                orElseThrow(() -> new ResourceNotFoundException("User", "id ", idUser))).
                orElseThrow(() -> new ResourceNotFoundException("Tutor", "id",idUser));
    }

    @Override
    public List<TutorInfoVO> getTop4Tutors() {
        logger.info("Get top 4");
//        return tutorParsing.toTutorsInfoVOList(tutorDAO.findTop4ByStatus(TutorStatus.CHUANHANLOP));
        return tutorParsing.toTutorsInfoVOList(tutorDAO.getTop4BySumOfClassTeach());
    }

    @Override
    public TutorInfoVO changeInfoTutor(TutorVO tutorVO, Long idTutor) {
        logger.info("Change info tutor with id " + idTutor);
        Tutor tutor = tutorDAO.findById(idTutor).orElseThrow(() ->
                new ResourceNotFoundException("Tutor", "id", idTutor));
        tutor.setCollege(tutorVO.getCollege());
        tutor.setMajor(tutorVO.getMajor());
        tutor.setGraduationYear(tutorVO.getGraduationYear());
        tutor.setLevel(tutorVO.getLevel());
        tutor.setGender(tutorVO.getGender());
        tutor.setYearOfBirth(tutorVO.getYearOfBirth());
        tutor.setSalaryPerHour(tutorVO.getSalaryPerHour());
        tutor.setMoreInfo(tutorVO.getMoreInfo());
        //update table tutor_subject
        if(tutorVO.getSubject() != null) {
            tutor.setSubjects(updateSubjects(tutorVO.getSubject()));
        }
        //update table tutor_class_teach
        if(tutorVO.getClassTeach() != null) {
            tutor.setClassTeaches(updateClassTeaches(tutorVO.getClassTeach()));
        }
        //update table tutor_district
        if(tutorVO.getDistrict() != null) {
            tutor.setDistricts(updateDistricts(tutorVO.getDistrict()));
        }
        //update table tutor_free_time
        if(tutorVO.getFreeTime() != null) {
            tutor.setFreeTimes(updateFreeTimes(tutorVO.getFreeTime()));
        }
        return tutorParsing.toTutorInfoVO(saveTutor(tutor));
    }

    @Override
    public boolean checkExistFreeTime(FreeTime freeTimeFirst, FreeTime freeTimeSecond) {
        return freeTimeFirst.getDayName().equals(freeTimeSecond.getDayName()) &&
                (freeTimeFirst.isMorning() == freeTimeSecond.isMorning()) &&
                (freeTimeFirst.isAfternoon() == freeTimeSecond.isAfternoon()) &&
                (freeTimeFirst.isEvening() == freeTimeSecond.isEvening());
    }

    @Override
    public Set<Subject> updateSubjects(Long[] subjects) {
        Set<Subject> subjectSet = new HashSet<>();
        for (Long idSubject : subjects) {
            subjectSet.add(subjectDAO.findById(idSubject)
                    .orElseThrow(() -> new BadRequestException("Subject " + idSubject + " does not exists")));
        }
        return subjectSet;
    }

    @Override
    public Set<District> updateDistricts(Long[] districts) {
        Set<District> districtSet = new HashSet<>();
        for (Long idDistrict : districts) {
            districtSet.add(districtDAO.findById(idDistrict).
                    orElseThrow(() -> new BadRequestException("District " + idDistrict + "does not exists")));
        }
        return districtSet;
    }

    @Override
    public Set<ClassTeach> updateClassTeaches(Long[] classTeaches) {
        Set<ClassTeach> classTeachSet = new HashSet<>();
        for (Long idClassTeach : classTeaches) {
            classTeachSet.add(classTeachDAO.findById(idClassTeach).
                    orElseThrow(() -> new BadRequestException("Class teach " + idClassTeach + "does not exists")));
        }
        return classTeachSet;
    }

    @Override
    public Set<FreeTime> updateFreeTimes(FreeTimeVO[] freeTimeVOS) {
        Set<FreeTime> freeTimeSet = new HashSet<>();
        List<FreeTime> freeTimeList = freeTimeDAO.findAll();
        for (FreeTimeVO freeTimeVO : freeTimeVOS) {
            FreeTime freeTimeCheck = freeTimeMapper.toFreeTime(freeTimeVO);
            int dem = 0;
            for (FreeTime freeTime : freeTimeList) {
                if(checkExistFreeTime(freeTime, freeTimeCheck)) {
                    freeTimeSet.add(freeTime);
                    dem++;
                    break;
                }
            }
            if(dem == 0) {
                FreeTime freeTime = freeTimeDAO.save(freeTimeMapper.toFreeTime(freeTimeVO));
                freeTimeSet.add(freeTime);
            }
        }
        return freeTimeSet;
    }

    @Override
    public List<TutorRatingVO> getAllTutorRegisterClassOfParent(String phone) {
        logger.info("Get all tutors register class of parent " + phone);
        User user = userDAO.findByPhone(phone).orElseThrow(() -> new ResourceNotFoundException("User", "phone", phone));
        List<Long> idTutors = tutorRegisterClassDAO.getAllByIdParent(user.getId());
        List<Tutor> tutors = new ArrayList<>();
        for (Long id : idTutors) {
            tutors.add(tutorDAO.findById(id).orElseThrow(() -> new ResourceNotFoundException("Tutor", "id", id)));
        }
        return tutorParsing.toTutorRatingVOList(tutors).stream().sorted
                (Comparator.comparing(TutorRatingVO::getId)).collect(Collectors.toList());
    }
}
