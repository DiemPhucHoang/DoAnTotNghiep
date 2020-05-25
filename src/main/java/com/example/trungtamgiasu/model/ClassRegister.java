package com.example.trungtamgiasu.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity(name = "ClassRegister")
@Table(name = "class_register")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ClassRegister {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_class_register")
    private Long id;

    @Column(nullable = false)
    private String status;

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
