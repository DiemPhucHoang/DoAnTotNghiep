package com.example.trungtamgiasu.security;

import com.example.trungtamgiasu.model.enums.Role;
import com.example.trungtamgiasu.model.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;
import java.util.stream.Collectors;

@Getter
public class UserPrincipal implements UserDetails {

    private Long id;

    private String name;

    private String phone;

    @JsonIgnore
    private String password;

    private Collection<? extends GrantedAuthority> authorities;

    public UserPrincipal(Long id, String name, String phone, String password, Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.password = password;
        this.authorities = authorities;
    }

    public static UserPrincipal create(User user) {

        Set<Role> roles = new HashSet<>();
        roles.add(user.getRole());

        List<GrantedAuthority> authorities = roles.stream().map(role ->
                new SimpleGrantedAuthority(role.getKey())).collect(Collectors.toList());

        return new UserPrincipal(
                user.getId(),
                user.getName(),
                user.getPhone(),
                user.getPassword(),
                authorities
        );
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return name;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserPrincipal that = (UserPrincipal) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
