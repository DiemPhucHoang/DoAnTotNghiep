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
public class TutorRegisterDetailVO {
    private Long idTutorRegisterClass;

    private Long idClass;

    private String nameTutor;

    private String phone;

    private String level;

    private String major;

    private String college;

    private String payment;

    private Date dateReceive;

    private String status;

    public TutorRegisterDetailVO(TutorRegisterClass tutorRegisterClass) {
        this.idClass = tutorRegisterClass.getClasses().getId();
        this.idTutorRegisterClass = tutorRegisterClass.getId();
        this.nameTutor = tutorRegisterClass.getTutor().getUser().getName();
        this.phone = tutorRegisterClass.getTutor().getUser().getPhone();
        this.level = tutorRegisterClass.getTutor().getLevel();
        this.major = tutorRegisterClass.getTutor().getMajor();
        this.college = tutorRegisterClass.getTutor().getCollege();
        this.payment = tutorRegisterClass.getPayment();
        this.dateReceive =tutorRegisterClass.getDateReceive();
        this.status = tutorRegisterClass.getStatus().getKey();
    }
}
