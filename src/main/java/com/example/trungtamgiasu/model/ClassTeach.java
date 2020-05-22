package com.example.trungtamgiasu.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity(name = "ClassTeach")
@Table(name = "class_teach")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ClassTeach {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_class_teach")
    private Long id;

    @Column(name = "class_teach_name", nullable = false)
    private String classTeachName;

    @ManyToMany(mappedBy = "classTeaches")
    @JsonIgnore
    private Set<Tutor> tutors = new HashSet<>();
}
