package com.example.trungtamgiasu.vo.Tutor;

import com.example.trungtamgiasu.model.enums.TutorStatus;
import com.example.trungtamgiasu.vo.FreeTime.FreeTimeVO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TutorVO {
    private Long id;

    @NotBlank
    private String gender;

    @NotBlank
    private String yearOfBirth;

    @NotBlank
    private String image;

    @NotBlank
    private String major;

    @NotBlank
    private String college;

    @NotBlank
    private String graduationYear;

    @NotBlank
    private String level;

    @NotBlank
    private Long[] subject;

    @NotBlank
    private Long[] classTeach;

    @NotBlank
    private Long[] district;

    @NotBlank
    private FreeTimeVO[] freeTime;

    private String moreInfo;

    private TutorStatus status;

    private String name;

    @NotBlank
    private double salaryPerHour;
}
