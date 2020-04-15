package com.example.trungtamgiasu.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity(name = "Tutor")
@Table(name = "tutor")
@Getter
@Setter
public class Tutor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "gender")
    private String gender;

    @Column(name = "yearOfBirth")
    private String yearOfBirth;

    @Column(name = "image")
    private String image;

    @Column(name = "major", nullable = false)
    private String major;

    @Column(name = "college", nullable = false)
    private String college;

    @Column(name = "graduationYear", nullable = false)
    private String graduationYear;

    @Column(name = "level", nullable = false)
    private String level;

    @Column(name = "subjects", nullable = false)
    private String subjects;

    @Column(name = "classes", nullable = false)
    private String classes;

    @Column(name = "districtCanTeach", nullable = false)
    private String districtCanTeach;

    @Lob
    private String moreInfo;

    @Column(nullable = false)
    private String status;

}
