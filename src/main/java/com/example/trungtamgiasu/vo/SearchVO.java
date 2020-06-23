package com.example.trungtamgiasu.vo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SearchVO {
    private String subject;

    private String grade;

    private String district;

    private String level;

    private String gender;
}
