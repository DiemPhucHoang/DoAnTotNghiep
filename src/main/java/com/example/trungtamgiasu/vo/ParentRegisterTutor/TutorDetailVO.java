package com.example.trungtamgiasu.vo.ParentRegisterTutor;

import com.example.trungtamgiasu.model.ParentRegisterTutor;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TutorDetailVO {
    private Long idTutor;

    private Long idClass;

    private String nameTutor;

    private String phone;

    private String level;

    private String major;

    private String college;

    private String status;

    private int score;

    public TutorDetailVO(ParentRegisterTutor parentRegisterTutor, int score) {
        this.idTutor = parentRegisterTutor.getId().getIdTutor();
        this.idClass = parentRegisterTutor.getIdClass();
        this.nameTutor = parentRegisterTutor.getTutor().getUser().getName();
        this.phone = parentRegisterTutor.getTutor().getUser().getPhone();
        this.level = parentRegisterTutor.getTutor().getLevel();
        this.major = parentRegisterTutor.getTutor().getMajor();
        this.college = parentRegisterTutor.getTutor().getCollege();
        this.status = parentRegisterTutor.getStatus().toString();
        this.score = score;
    }
}
