package com.example.trungtamgiasu.vo.classes;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ClassesInfoVO {
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

    private String time;

    private int noDay;

    private int noHour;
}
