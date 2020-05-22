package com.example.trungtamgiasu.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ParentRegisterTutorKey implements Serializable {
    @Column(name = "id_parent")
    private Long idParent;

    @Column(name = "id_tutor")
    private Long idTutor;

}
