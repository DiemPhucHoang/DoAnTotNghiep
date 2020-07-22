package com.example.trungtamgiasu.vo.Tutor;

import com.example.trungtamgiasu.model.ClassTeach;
import com.example.trungtamgiasu.model.District;
import com.example.trungtamgiasu.model.FreeTime;
import com.example.trungtamgiasu.model.Subject;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TutorByUserVO {
    private Long id;

    @NotBlank
    private String gender;

    @NotBlank
    private String yearOfBirth;

    @NotBlank
    private String major;

    @NotBlank
    private String college;

    @NotBlank
    private String graduationYear;

    @NotBlank
    private String level;

    @NotBlank
    private List<Subject> subjects;

    @NotBlank
    private List<ClassTeach> classTeaches;

    @NotBlank
    private List<District> districts;

    @NotBlank
    private List<FreeTime> freeTimes;

    private String moreInfo;

    private String status;

    private String name;

    private double salaryPerHour;
}
