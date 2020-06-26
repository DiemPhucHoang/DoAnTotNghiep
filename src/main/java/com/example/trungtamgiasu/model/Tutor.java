package com.example.trungtamgiasu.model;

import com.example.trungtamgiasu.model.enums.TutorStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity(name = "Tutor")
@Table(name = "tutors")
@Getter
@Setter
public class Tutor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_tutor")
    private Long id;

    @Column(name = "gender", nullable = false)
    private String gender;

    @Column(name = "yearOfBirth", nullable = false)
    private String yearOfBirth;

    @Column(name = "image", nullable = false)
    private String image;

    @Column(name = "major", nullable = false)
    private String major;

    @Column(name = "college", nullable = false)
    private String college;

    @Column(name = "graduationYear", nullable = false)
    private String graduationYear;

    @Column(name = "level", nullable = false)
    private String level;

    @Column(name = "salaryPerHour", nullable = false)
    private double salaryPerHour;

    @Lob
    private String moreInfo;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private TutorStatus status;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "tutor_subject", joinColumns = @JoinColumn(name = "id_tutor"),
            inverseJoinColumns = @JoinColumn(name = "id_subject"))
    private Set<Subject> subjects = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "tutor_class_teach", joinColumns = @JoinColumn(name = "id_tutor"),
            inverseJoinColumns = @JoinColumn(name = "id_class_teach"))
    private Set<ClassTeach> classTeaches = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "tutor_district", joinColumns = @JoinColumn(name = "id_tutor"),
            inverseJoinColumns = @JoinColumn(name = "id_district"))
    private Set<District> districts = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "tutor_free_time", joinColumns = @JoinColumn(name = "id_tutor"),
            inverseJoinColumns = @JoinColumn(name = "id_free_time"))
    private List<FreeTime> freeTimes = new ArrayList<>();

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_user")
    @JsonIgnore
    private User user;
}
