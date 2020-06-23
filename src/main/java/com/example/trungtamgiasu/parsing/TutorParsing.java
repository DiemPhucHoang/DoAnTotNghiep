package com.example.trungtamgiasu.parsing;

import com.example.trungtamgiasu.exception.TutorException;
import com.example.trungtamgiasu.model.*;
import com.example.trungtamgiasu.model.enums.District;
import com.example.trungtamgiasu.model.enums.Grade;
import com.example.trungtamgiasu.model.enums.Subject;
import com.example.trungtamgiasu.model.enums.TutorStatus;
import com.example.trungtamgiasu.vo.TutorVO;

import java.util.HashSet;
import java.util.Set;

public class TutorParsing {
    public static Tutor parseTutorVOToEntity(TutorVO tutorVO)  {

        if (tutorVO == null) {
            throw new TutorException("Invalid tutorVO info");
        }

        TutorStatus status = null;
        if (tutorVO.getStatus() != null) {
            status = TutorStatus.from(tutorVO.getStatus());
            if (status == null) {
                throw new TutorException ("Value " + tutorVO.getStatus() + " is invalid Status value");
            }
        }

        Set<Subject> subjects = new HashSet<>();
        if (tutorVO.getSubjects().size() > 0) {
            for (String subject : tutorVO.getSubjects()) {
                subjects.add(Subject.from(subject));
            }
        }

        Set<Grade> grades = new HashSet<>();
        if (tutorVO.getGrades().size() > 0) {
            for (String grade : tutorVO.getGrades()) {
                grades.add(Grade.from(grade));
            }
        }

        Set<District> districts = new HashSet<>();
        if (tutorVO.getDistricts().size() > 0) {
            for (String district : tutorVO.getDistricts()) {
                districts.add(District.from(district));
            }
        }

        return new Tutor(tutorVO.getGender(), tutorVO.getYearOfBirth(), tutorVO.getImage(),
                tutorVO.getMajor(), tutorVO.getCollege(), tutorVO.getGraduationYear(), tutorVO.getLevel(),
                subjects, grades, districts, tutorVO.getMoreInfo(), status);
    }
}
