package com.example.trungtamgiasu.vo.Tutor;

import com.example.trungtamgiasu.model.FreeTime;
import com.example.trungtamgiasu.model.TutorStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.util.List;
import java.util.Set;

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
    private List<String> subjects;

    @NotBlank
    private List<String> classTeaches;

    @NotBlank
    private List<String> districts;

    @NotBlank
    private Set<FreeTime> freeTimes;

    private String moreInfo;

    private TutorStatus status;

    private String name;


}
