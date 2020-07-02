package com.example.trungtamgiasu.vo.TutorRegisterClass;

import com.example.trungtamgiasu.model.enums.TutorRegisterClassStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TutorRegisterClassInfoVO {

    private Long idTutor;

    private String name;

    private String gender;

    private String level;

    private String payment;

    private TutorRegisterClassStatus status;

}
