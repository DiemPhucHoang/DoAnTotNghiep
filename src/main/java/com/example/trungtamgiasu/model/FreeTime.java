package com.example.trungtamgiasu.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity(name = "FreeTime")
@Table(name = "free_time")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FreeTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_free_time")
    private Long id;

    @Column(nullable = false)
    private boolean morning;

    @Column(nullable = false)
    private boolean afternoon;

    @Column(nullable = false)
    private boolean evening;

    @Column(name = "day_name", length = 50, nullable = false)
    private String dayName;

    @ManyToMany(mappedBy = "freeTimes")
    @JsonIgnore
    private Set<Tutor> tutors = new HashSet<>();
}
