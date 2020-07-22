package com.example.trungtamgiasu.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.Date;

@Entity(name = "Rate")
@Table(name = "rate")
@Getter
@Setter
@EntityListeners(AuditingEntityListener.class)
public class Rate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_rate")
    private Long id;

    private int star;

    private String comment;

    @CreatedDate
    private Date time;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "id_parent", nullable = false)
    private User user;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "id_tutor", nullable = false)
    private Tutor tutor;
}
