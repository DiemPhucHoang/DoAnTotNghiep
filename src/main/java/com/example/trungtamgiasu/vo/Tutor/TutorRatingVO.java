package com.example.trungtamgiasu.vo.Tutor;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TutorRatingVO {
    private Long id;

    private byte[] image;

    private String name;

    private String gender;

    private String level;
}
