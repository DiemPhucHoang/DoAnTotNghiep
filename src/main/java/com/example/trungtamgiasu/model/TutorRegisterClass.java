package com.example.trungtamgiasu.model;

import com.example.trungtamgiasu.model.enums.TutorRegisterClassStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity(name = "TutorRegisterClass")
@Table(name = "tutor_register_class")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TutorRegisterClass {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_register")
    private Long id;

    @Column(nullable = false)
    private TutorRegisterClassStatus status;

    @Column(nullable = false)
    private Date dateReceive;

    @Column(nullable = false)
    private String payment;

    @Lob
    private String moreRequire;

    @OneToOne(mappedBy = "classRegister")
    private Invoice invoice;

    @ManyToOne
    @JoinColumn(name = "id_class")
    private Classes classes;

    @ManyToOne
    @JoinColumn(name = "id_tutor")
    private Tutor tutor;

}
