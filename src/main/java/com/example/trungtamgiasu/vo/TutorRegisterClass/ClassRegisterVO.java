package com.example.trungtamgiasu.vo.TutorRegisterClass;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ClassRegisterVO {
    private Long idRegister;

    private Long idClass;

    private String classTeach;

    private String subject;

    private String tuitionFee;

    private String payment;

    private String status;

    private String time;
}
