package com.example.trungtamgiasu.vo.TutorRegisterClass;

import com.example.trungtamgiasu.model.enums.TutorRegisterClassStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TutorRegisterClassVO {

    private TutorRegisterClassStatus status;

    @NotBlank
    private Date dateReceive;

    @NotBlank
    private String payment;

    private String moreRequire;
}
