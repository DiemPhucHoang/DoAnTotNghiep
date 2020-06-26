package com.example.trungtamgiasu.mapper.impl;

import com.example.trungtamgiasu.dao.TutorDAO;
import com.example.trungtamgiasu.exception.BadRequestException;
import com.example.trungtamgiasu.exception.ResourceNotFoundException;
import com.example.trungtamgiasu.mapper.TutorMapper;
import com.example.trungtamgiasu.model.*;
import com.example.trungtamgiasu.vo.Tutor.TutorInfoVO;
import com.example.trungtamgiasu.vo.Tutor.TutorVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Component
public class TutorMapperImpl implements TutorMapper {

    @Autowired
    private TutorDAO tutorDAO;

    @Override
    public Tutor toTutor(TutorVO tutorVO) {
        if (tutorVO == null) {
            return null;
        } else {
            Tutor tutor = new Tutor();
            tutor.setId(tutorVO.getId());
            tutor.setGender(tutorVO.getGender());
            tutor.setYearOfBirth(tutorVO.getYearOfBirth());
            tutor.setImage(tutorVO.getImage());
            tutor.setMajor(tutorVO.getMajor());
            tutor.setCollege(tutorVO.getCollege());
            tutor.setGraduationYear(tutorVO.getGraduationYear());
            tutor.setLevel(tutorVO.getLevel());
            tutor.setSalaryPerHour(tutorVO.getSalaryPerHour());
            tutor.setMoreInfo(tutorVO.getMoreInfo());
            tutor.setStatus(tutorVO.getStatus());
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

        tutorInfoVO.setId( tutor.getId() );
        tutorInfoVO.setGender( tutor.getGender() );
        tutorInfoVO.setYearOfBirth( tutor.getYearOfBirth() );
        tutorInfoVO.setImage(readBytesFromFile(tutor.getId()));
        tutorInfoVO.setMajor( tutor.getMajor() );
        tutorInfoVO.setCollege( tutor.getCollege() );
        tutorInfoVO.setGraduationYear( tutor.getGraduationYear() );
        tutorInfoVO.setLevel( tutor.getLevel() );
        tutorInfoVO.setSalaryPerHour(tutor.getSalaryPerHour());
        tutorInfoVO.setMoreInfo( tutor.getMoreInfo() );
        tutorInfoVO.setStatus( tutor.getStatus() );

        Set<Subject> subjectSet = tutor.getSubjects();
        List<String> subjectNames = new ArrayList<>();
        for (Subject subject : subjectSet) {
            subjectNames.add(subject.getSubjectName());
        }
        tutorInfoVO.setSubjects(subjectNames);

        Set<ClassTeach> classTeachSet = tutor.getClassTeaches();
        List<String> classTeachNames = new ArrayList<>();
        for (ClassTeach classTeach : classTeachSet) {
            classTeachNames.add(classTeach.getClassTeachName());
        }
        tutorInfoVO.setClassTeaches(classTeachNames);

        Set<District> districtSet = tutor.getDistricts();
        List<String> districtNames = new ArrayList<>();
        for (District district : districtSet) {
            districtNames.add(district.getDistrictName());
        }
        tutorInfoVO.setDistricts(districtNames);
        List<FreeTime> freeTimes = tutor.getFreeTimes();
        if ( freeTimes != null ) {
            tutorInfoVO.setFreeTimes( new ArrayList<>( freeTimes ) );
        }
        tutorInfoVO.setName(tutor.getUser().getName());
        return tutorInfoVO;
    }

    @Override
    public List<TutorInfoVO> toTutorsInfoVOList(List<Tutor> tutorsList) {
        List<TutorInfoVO> tutorInfoVOS = new ArrayList<>();
        if (tutorsList == null) {
            return null;
        }
        for (Tutor tutor : tutorsList) {
            tutorInfoVOS.add(toTutorInfoVO(tutor));
        }
        return tutorInfoVOS;
    }

    @Override
    public List<Tutor> toTutorsList(List<TutorVO> tutorsVOList) {
        List<Tutor> tutors = new ArrayList<>();
        if (tutorsVOList == null) {
            return null;
        }
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

    public byte[] readBytesFromFile(Long idTutor) {
        if(!tutorDAO.existsById(idTutor)) {
            throw new ResourceNotFoundException("Tutor", "id", idTutor);
        }
        String fileName = tutorDAO.findById(idTutor).orElseThrow(() ->
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
}
