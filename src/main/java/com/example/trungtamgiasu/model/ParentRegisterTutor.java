package com.example.trungtamgiasu.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity(name = "ParentRegisterTutor")
@Table(name = "parent_register_tutor")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ParentRegisterTutor {
    @EmbeddedId
    ParentRegisterTutorKey id;

    @ManyToOne
    @MapsId("id_parent")
    @JoinColumn(name = "id_user")
    @JsonIgnore
    private User user;

    @ManyToOne
    @MapsId("id_tutor")
    @JoinColumn(name = "id_tutor")
    @JsonIgnore
    private Tutor tutor;

    private Integer score;

    private String message;

    private boolean status;


}
