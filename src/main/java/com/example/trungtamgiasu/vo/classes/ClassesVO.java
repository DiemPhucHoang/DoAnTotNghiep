package com.example.trungtamgiasu.vo.classes;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ClassesVO {
    private Long id;

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

    @NotBlank
    private double tuitionFee;

    private String status;

    @NotBlank
    private String name;

    @NotBlank
    @Size(min = 10, max = 11)
    private String phone;

    @Email
    private String email;

    private Long[] idTutors;

    private int noDay;

    private int noHour;
}
