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
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_user")
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "phone", length = 11, nullable = false)
    private String phone;

    @Column(name = "address")
    private String address;

    @Column(name = "email")
    @Email
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "image")
    private String image;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "user_role", joinColumns = @JoinColumn(name = "id_user"),
                                    inverseJoinColumns = @JoinColumn(name = "id_role"))
    private Set<Role> roles = new HashSet<>();

    @OneToOne(fetch = FetchType.LAZY,
            cascade =  CascadeType.ALL,
            mappedBy = "user")
    private Tutor tutor;

    @OneToMany(mappedBy = "user")
    private Set<Classes> classes = new HashSet<>();

    @OneToMany(mappedBy = "user")
    private Set<Rate> rates = new HashSet<>();

    public User(String name, String phone, String address, @Email String email, String password) {
        this.name = name;
        this.phone = phone;
        this.address = address;
        this.email = email;
        this.password = password;
    }

    public User(String name, String phone, String address, @Email String email, String password, String image) {
        this.name = name;
        this.phone = phone;
        this.address = address;
        this.email = email;
        this.password = password;
        this.image = image;
    }

    public User(String name, String phone, @Email String email) {
        this.name = name;
        this.phone = phone;
        this.email = email;
    }

    public User(String name, String phone, String address, @Email String email) {
        this.name = name;
        this.phone = phone;
        this.address = address;
        this.email = email;
    }
}
