package com.example.trungtamgiasu.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Email;
import java.util.HashSet;
import java.util.Set;

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

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "user_role", joinColumns = @JoinColumn(name = "user_id"),
                                    inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();

    public User(String name, String phone, String address, @Email String email, String password) {
        this.name = name;
        this.phone = phone;
        this.address = address;
        this.email = email;
        this.password = password;
    }
}
