package com.example.trungtamgiasu.model;

import com.example.trungtamgiasu.model.enums.District;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity (name = "Request")
@Table(name = "request")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Request {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "subject")
    private String subject;

    @Column(name = "district")
    private District district;

    @Column(name = "time")
    private String time;

    @Column(name = "phone", nullable = false, length = 11)
    private String phone;
}
