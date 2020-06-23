package com.example.trungtamgiasu.model;

import com.example.trungtamgiasu.model.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Email;

@Entity(name = "User")
@Table(name = "users", uniqueConstraints = {@UniqueConstraint(columnNames = "phone")})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "phone", length = 11)
    private String phone;

    @Column(name = "address")
    private String address;

    @Column(name = "email")
    @Email
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "role", nullable = false)
    private Role role;

    @OneToOne(mappedBy="user")
    private Tutor tutor;

    public User(String name, String phone, String address, @Email String email, String password, Role role) {
        this.name = name;
        this.phone = phone;
        this.address = address;
        this.email = email;
        this.password = password;
        this.role = role;
    }
}
