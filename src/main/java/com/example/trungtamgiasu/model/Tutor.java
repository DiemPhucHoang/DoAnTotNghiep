package com.example.trungtamgiasu.model;

import com.example.trungtamgiasu.model.enums.District;
import com.example.trungtamgiasu.model.enums.Grade;
import com.example.trungtamgiasu.model.enums.Subject;
import com.example.trungtamgiasu.model.enums.TutorStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity(name = "Tutor")
@Table(name = "tutor")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
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
    @ElementCollection(fetch = FetchType.EAGER)
//    @CollectionTable(name = "subject", joinColumns = @JoinColumn(name = "id"))
    @Enumerated(EnumType.ORDINAL)
    private Set<Subject> subjects;

    @Column(name = "grade", nullable = false)
    @ElementCollection(fetch = FetchType.EAGER)
    @Enumerated(EnumType.ORDINAL)
    private Set<Grade> grades;

    @Column(name = "districts", nullable = false)
    @ElementCollection(fetch = FetchType.EAGER)
    @Enumerated(EnumType.ORDINAL)
    private Set<District> districts;

    @Lob
    @Column(name = "moreInfo")
    private String moreInfo;

    @Column(name = "status", nullable = false)
    private TutorStatus status;

//    @OneToMany(fetch = FetchType.LAZY, mappedBy = "tutor")
//    private Set<FreeTime> freeTimes;

    @OneToOne
    @JoinColumn(name="user_id")
    private User user;

    public Tutor(String gender, String yearOfBirth, String image, String major, String college,
                 String graduationYear, String level, Set<Subject> subjects,
                 Set<Grade> grades, Set<District> districts, String moreInfo, TutorStatus status) {
        this.gender = gender;
        this.yearOfBirth = yearOfBirth;
        this.image = image;
        this.major = major;
        this.college = college;
        this.graduationYear = graduationYear;
        this.level = level;
        this.subjects = subjects;
        this.grades = grades;
        this.districts = districts;
        this.moreInfo = moreInfo;
        this.status = status == null ? TutorStatus.ACTIVE : status;
    }
}
