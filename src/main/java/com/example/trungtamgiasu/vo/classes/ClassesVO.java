package com.example.trungtamgiasu.vo.classes;

import com.example.trungtamgiasu.model.ClassesStatus;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
@Setter
public class ClassesVO {
    @NotBlank
    private String classTeach;

    @NotBlank
    private String subject;

    private String levelRequirement;

    private String genderRequirement;

    @NotBlank
    private String district;

    @NotBlank
    private String timeTeach;

    @NotBlank
    private String address;

    private double tuitionFee;

    private ClassesStatus classesStatus;

    @NotBlank
    private String name;

    @NotBlank
    @Size(min = 10, max = 11)
    private String phone;

    @Email
    private String email;

    private Long[] idTutors;
}
