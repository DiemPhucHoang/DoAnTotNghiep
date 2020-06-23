package com.example.trungtamgiasu.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity(name = "FreeTime")
@Table(name = "free_time")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FreeTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "morning")
    private boolean morning;

    @Column(name = "afternoon")
    private boolean afternoon;

    @Column(name = "evening")
    private boolean evening;

    @Column(name = "day")
    private String day;

    @ManyToOne
    @JoinColumn(name = "tutor_id", nullable = false)
    private Tutor tutor;
}
