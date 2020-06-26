package com.example.trungtamgiasu.model;

import com.example.trungtamgiasu.model.enums.RoleName;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity (name = "Role")
@Table (name = "roles")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_role")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "role_name")
    private RoleName name;

    @ManyToMany(mappedBy = "roles")
    @JsonIgnore
    private Set<User> users = new HashSet<>();

    public Role(RoleName name) {
        this.name = name;
    }

    public Role(Long id, RoleName name) {
        this.id = id;
        this.name = name;
    }
}
