package com.example.trungtamgiasu.parsing.impl;

import com.example.trungtamgiasu.dao.TutorDAO;
import com.example.trungtamgiasu.dao.UserDAO;
import com.example.trungtamgiasu.exception.BadRequestException;
import com.example.trungtamgiasu.exception.ResourceNotFoundException;
import com.example.trungtamgiasu.model.*;
import com.example.trungtamgiasu.model.enums.TutorStatus;
import com.example.trungtamgiasu.parsing.TutorParsing;
import com.example.trungtamgiasu.vo.Tutor.TutorByUserVO;
import com.example.trungtamgiasu.vo.Tutor.TutorInfoVO;
import com.example.trungtamgiasu.vo.Tutor.TutorRatingVO;
import com.example.trungtamgiasu.vo.Tutor.TutorVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class TutorParsingImpl implements TutorParsing {

    @Autowired
    private TutorDAO tutorDAO;

    @Autowired
    private UserDAO userDAO;

    @Override
    public Tutor toTutor(TutorVO tutorVO) {
        if (tutorVO == null) {
            return null;
        } else {
            Tutor tutor = new Tutor();
            tutor.setId(tutorVO.getId());
            tutor.setGender(tutorVO.getGender());
            tutor.setYearOfBirth(tutorVO.getYearOfBirth());
//            tutor.setImage(tutorVO.getImage());
            tutor.setMajor(tutorVO.getMajor());
            tutor.setCollege(tutorVO.getCollege());
            tutor.setGraduationYear(tutorVO.getGraduationYear());
            tutor.setLevel(tutorVO.getLevel());
            tutor.setSalaryPerHour(tutorVO.getSalaryPerHour());
            tutor.setMoreInfo(tutorVO.getMoreInfo());
            tutor.setStatus(TutorStatus.from(tutorVO.getStatus()));
            return tutor;
        }

    }

    @Override
    public Tutor toTutorByTutorInfoVO(TutorInfoVO tutorInfoVO) {
        return null;
    }

    @Override
    public TutorVO toTutorVO(Tutor tutor) {
        return null;
    }

    @Override
    public TutorInfoVO toTutorInfoVO(Tutor tutor) {
        if(tutor == null) {
            return null;
        }
        TutorInfoVO tutorInfoVO = new TutorInfoVO();
        tutorInfoVO.setId(tutor.getId());
        tutorInfoVO.setGender(tutor.getGender());
        tutorInfoVO.setYearOfBirth(tutor.getYearOfBirth());
        if(tutor.getUser().getImage() != null) {
            tutorInfoVO.setImage(readBytesFromFile(tutor.getUser().getId()));
        }
        tutorInfoVO.setMajor(tutor.getMajor());
        tutorInfoVO.setCollege(tutor.getCollege());
        tutorInfoVO.setGraduationYear(tutor.getGraduationYear());
        tutorInfoVO.setLevel(tutor.getLevel());
        tutorInfoVO.setSalaryPerHour(tutor.getSalaryPerHour());
        tutorInfoVO.setMoreInfo(tutor.getMoreInfo());
        tutorInfoVO.setStatus(tutor.getStatus().getKey());

        Set<Subject> subjectSet = tutor.getSubjects();
        if(subjectSet != null) {
            List<Subject> sortedSubjectList = subjectSet.stream().sorted
                    (Comparator.comparing(Subject::getId)).collect(Collectors.toList());
            tutorInfoVO.setSubjects(sortedSubjectList);
        }

        Set<ClassTeach> classTeachSet = tutor.getClassTeaches();
        if(classTeachSet != null) {
            List<ClassTeach> sortedClassTeachList = classTeachSet.stream().sorted
                    (Comparator.comparing(ClassTeach::getId)).collect(Collectors.toList());
            tutorInfoVO.setClassTeaches(sortedClassTeachList);
        }

        Set<District> districtSet = tutor.getDistricts();
        if(districtSet != null) {
            List<District> sortedDistrictList = districtSet.stream().sorted
                    (Comparator.comparing(District::getId)).collect(Collectors.toList());
            tutorInfoVO.setDistricts(sortedDistrictList);
        }

        Set<FreeTime> freeTimeSet = tutor.getFreeTimes();
        if ( freeTimeSet != null ) {
            List<FreeTime> sortedFreeTimeList = freeTimeSet.stream().sorted
                    (Comparator.comparing(FreeTime::getDayName)).collect(Collectors.toList());
            tutorInfoVO.setFreeTimes(sortedFreeTimeList);
        }
        tutorInfoVO.setName(tutor.getUser().getName());
        return tutorInfoVO;
    }

    @Override
    public TutorByUserVO toTutorByUserVO(Tutor tutor) {
        if(tutor == null) {
            return null;
        }
        TutorByUserVO tutorByUserVO = new TutorByUserVO();
        tutorByUserVO.setId(tutor.getId());
        tutorByUserVO.setGender(tutor.getGender());
        tutorByUserVO.setYearOfBirth(tutor.getYearOfBirth());
        tutorByUserVO.setMajor(tutor.getMajor());
        tutorByUserVO.setCollege(tutor.getCollege());
        tutorByUserVO.setGraduationYear(tutor.getGraduationYear());
        tutorByUserVO.setLevel(tutor.getLevel());
        tutorByUserVO.setSalaryPerHour(tutor.getSalaryPerHour());
        tutorByUserVO.setMoreInfo(tutor.getMoreInfo());
        tutorByUserVO.setStatus(tutor.getStatus().getKey());

        Set<Subject> subjectSet = tutor.getSubjects();
        if(subjectSet != null) {
            List<Subject> sortedSubjectList = subjectSet.stream().sorted
                    (Comparator.comparing(Subject::getId)).collect(Collectors.toList());
            tutorByUserVO.setSubjects(sortedSubjectList);
        }

        Set<ClassTeach> classTeachSet = tutor.getClassTeaches();
        if(classTeachSet != null) {
            List<ClassTeach> sortedClassTeachList = classTeachSet.stream().sorted
                    (Comparator.comparing(ClassTeach::getId)).collect(Collectors.toList());
            tutorByUserVO.setClassTeaches(sortedClassTeachList);
        }

        Set<District> districtSet = tutor.getDistricts();
        if(districtSet != null) {
            List<District> sortedDistrictList = districtSet.stream().sorted
                    (Comparator.comparing(District::getId)).collect(Collectors.toList());
            tutorByUserVO.setDistricts(sortedDistrictList);
        }

        Set<FreeTime> freeTimeSet = tutor.getFreeTimes();
        if ( freeTimeSet != null ) {
            List<FreeTime> sortedFreeTimeList = freeTimeSet.stream().sorted
                    (Comparator.comparing(FreeTime::getDayName)).collect(Collectors.toList());
            tutorByUserVO.setFreeTimes(sortedFreeTimeList);
        }
        tutorByUserVO.setName(tutor.getUser().getName());
        return tutorByUserVO;
    }

    @Override
    public List<TutorInfoVO> toTutorsInfoVOList(List<Tutor> tutorsList) {
        if (tutorsList == null) {
            return null;
        }
        List<TutorInfoVO> tutorInfoVOS = new ArrayList<>();
        for (Tutor tutor : tutorsList) {
            tutorInfoVOS.add(toTutorInfoVO(tutor));
        }
        return tutorInfoVOS;
    }

    @Override
    public List<Tutor> toTutorsList(List<TutorVO> tutorsVOList) {
        if (tutorsVOList == null) {
            return null;
        }
        List<Tutor> tutors = new ArrayList<>();
        for (TutorVO tutorVO : tutorsVOList) {
            tutors.add(toTutor(tutorVO));
        }
        return tutors;
    }

    @Override
    public List<Tutor> toTutorsListByTutorsInfoVO(List<TutorInfoVO> tutorInfoVOS) {
        List<Tutor> tutors = new ArrayList<>();
        if(tutorInfoVOS == null) {
            return null;
        }
//        for (TutorInfoVO tutorInfoVO : tutorInfoVOS) {
//            tutors.add(toTutor())
//        }
        return tutors;
    }

    public byte[] readBytesFromFile(Long idUser) {
        if(!userDAO.existsById(idUser)) {
            throw new ResourceNotFoundException("User", "id", idUser);
        }
        String fileName = userDAO.findById(idUser).orElseThrow(() ->
                new BadRequestException("File name does not exists")).getImage();
        String filePath = "uploads\\" + fileName;
        FileInputStream fileInputStream = null;
        byte[] bytesArray = null;
        try{
            File file =new File(filePath);
            bytesArray = new byte[(int) file.length()];
            //read file into bytes[]
            fileInputStream = new FileInputStream(file);
            int number = fileInputStream.read(bytesArray);
            System.out.print("Number " + number);
        }catch (IOException e) {
            e.printStackTrace();
        }finally {
            if (fileInputStream != null) {
                try {
                    fileInputStream.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        return bytesArray;
    }

    @Override
    public TutorRatingVO toTutorRatingVO(Tutor tutor) {
        if(tutor == null) {
            return null;
        }
        TutorRatingVO tutorRatingVO = new TutorRatingVO();
        tutorRatingVO.setId(tutor.getId());
        tutorRatingVO.setName(tutor.getUser().getName());
        tutorRatingVO.setGender(tutor.getGender());
        tutorRatingVO.setLevel(tutor.getLevel());
        if(tutor.getUser().getImage() != null) {
            tutorRatingVO.setImage(readBytesFromFile(tutor.getUser().getId()));
        }
        return tutorRatingVO;
    }

    @Override
    public List<TutorRatingVO> toTutorRatingVOList(List<Tutor> tutors) {
        if(tutors == null) {
            return null;
        }
        List<TutorRatingVO> ratingVOList = new ArrayList<>();
        for (Tutor tutor : tutors) {
            ratingVOList.add(toTutorRatingVO(tutor));
        }
        return ratingVOList;
    }
}
