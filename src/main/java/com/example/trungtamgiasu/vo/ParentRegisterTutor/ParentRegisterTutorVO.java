package com.example.trungtamgiasu.vo.ParentRegisterTutor;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ParentRegisterTutorVO {
    private Long idClass;
    private String nameParent;
    private String classTeach;
    private String subject;
    private String district;
    private Date time;
    private int noTutor;
    private String status;
}
