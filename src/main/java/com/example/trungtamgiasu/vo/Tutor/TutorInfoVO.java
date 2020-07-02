package com.example.trungtamgiasu.vo.Tutor;

import com.example.trungtamgiasu.model.FreeTime;
import com.example.trungtamgiasu.model.enums.TutorStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TutorInfoVO {
    private Long id;

    @NotBlank
    private String gender;

    @NotBlank
    private String yearOfBirth;

    @NotBlank
    private byte[] image;

    @NotBlank
    private String major;

    @NotBlank
    private String college;

    @NotBlank
    private String graduationYear;

    @NotBlank
    private String level;

    @NotBlank
    private List<String> subjects;

    @NotBlank
    private List<String> classTeaches;

    @NotBlank
    private List<String> districts;

    @NotBlank
    private List<FreeTime> freeTimes;

    private String moreInfo;

    private TutorStatus status;

    private String name;

    @NotBlank
    private double salaryPerHour;


}
