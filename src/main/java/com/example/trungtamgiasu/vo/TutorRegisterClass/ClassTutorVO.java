package com.example.trungtamgiasu.vo.TutorRegisterClass;

import com.example.trungtamgiasu.model.TutorRegisterClass;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ClassTutorVO {
    private Long idClass;
    private String classTeach;
    private String subject;
    private double tuitionFee;
    private String district;
    private Date time;
    private int noTutor;
    private String status;

    public ClassTutorVO(TutorRegisterClass tutorRegisterClass, int noTutor, String status) {
        this.idClass = tutorRegisterClass.getClasses().getId();
        this.classTeach = tutorRegisterClass.getClasses().getClassTeach();
        this.subject = tutorRegisterClass.getClasses().getSubject();
        this.tuitionFee = tutorRegisterClass.getClasses().getTuitionFee();
        this.district = tutorRegisterClass.getClasses().getDistrict();
        this.time = tutorRegisterClass.getTime();
        this.noTutor = noTutor;
        this.status = status;
    }
}
