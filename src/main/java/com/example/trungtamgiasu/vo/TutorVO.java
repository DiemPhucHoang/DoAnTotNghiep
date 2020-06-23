package com.example.trungtamgiasu.vo;

import com.example.trungtamgiasu.model.enums.District;
import com.example.trungtamgiasu.model.enums.Grade;
import com.example.trungtamgiasu.model.enums.Subject;
import com.example.trungtamgiasu.model.Tutor;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TutorVO {
    private String gender;
    private String yearOfBirth;
    private String image;
    private String major;
    private String college;
    private String graduationYear;
    private String level;
    private Set<String> grades;
    private String moreInfo;

    private Set<String> subjects;
    private Set<String> districts;
    private String status;

    public TutorVO(Tutor tutor) {
        this.gender = tutor.getGender();
        this.yearOfBirth = tutor.getYearOfBirth();
        this.image = tutor.getImage();
        this.major = tutor.getMajor();
        this.college = tutor.getCollege();
        this.graduationYear = tutor.getGraduationYear();
        this.level = tutor.getLevel();
        this.grades = new HashSet<>();
        for (Grade grade: tutor.getGrades()) {
            this.grades.add(grade.getKey());
        }
        this.moreInfo = tutor.getMoreInfo();
        this.subjects = new HashSet<>();
        for(Subject subject: tutor.getSubjects()) {
            this.subjects.add(subject.getKey());
        }
        this.districts = new HashSet<>();
        for(District district: tutor.getDistricts()) {
            this.districts.add(district.getKey());
        }
        this.status = tutor.getStatus().getKey();
    }
}
