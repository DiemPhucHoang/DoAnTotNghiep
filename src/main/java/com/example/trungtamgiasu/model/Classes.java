package com.example.trungtamgiasu.model;

import com.example.trungtamgiasu.model.enums.ClassesStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.Date;

@Entity(name = "Classes")
@Table(name = "classes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Classes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_class")
    private Long id;

    @Column(name = "class_teach", nullable = false)
    private String classTeach;

    @Column(nullable = false)
    private String subject;

    private String levelRequirement;

    private String genderRequirement;

    @Column(nullable = false)
    private String district;

    private String timeTeach;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private double tuitionFee;

    @Column(nullable = false)
    @Enumerated(EnumType.ORDINAL)
    private ClassesStatus status;

    @CreatedDate
    private Date time;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "id_parent", nullable = false)
    private User user;
}