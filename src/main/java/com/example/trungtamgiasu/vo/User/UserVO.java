package com.example.trungtamgiasu.vo.User;

import com.example.trungtamgiasu.model.Role;
import com.example.trungtamgiasu.model.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserVO {
    private  Long id;
    @NotBlank
    private String name;

    @NotBlank
    @Size(min = 10, max = 11)
    private String phone;

    @NotBlank
    private String address;

    @Email
    private String email;

    @NotBlank
    @Size(min = 6, max = 20)
    private String password;

    private String role;

    private String image;

    public UserVO(User user) {
        this.id = user.getId();
        this.name = user.getName();
        this.phone = user.getPhone();
        this.address = user.getAddress();
        this.email = user.getEmail();
        this.password = user.getPassword();
        Set<Role> roles = user.getRoles();
        this.role = roles.iterator().next().getName().toString();
    }
}
