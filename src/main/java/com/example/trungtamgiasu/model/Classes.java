package com.example.trungtamgiasu.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity(name = "Classes")
@Table(name = "classes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Classes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_class")
    private Long id;

    @Column(name = "class_teach", nullable = false)
    private String classTeach;

    @Column(nullable = false)
    private String subject;

    @Column(nullable = false)
    private String timeTeach;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private String district;

    @Column(nullable = false)
    private double salary;

    @Column(name = "service_fee", nullable = false)
    private double serviceFee;

    @Column(nullable = false)
    private String status;

    @ManyToOne
    @JoinColumn(name = "id_user", nullable = false)
    private User user;
}
