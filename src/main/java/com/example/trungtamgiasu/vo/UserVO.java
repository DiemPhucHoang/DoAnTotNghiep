package com.example.trungtamgiasu.vo;

import com.example.trungtamgiasu.model.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserVO {
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

    public UserVO(User user) {
        this.name = user.getName();
        this.phone = user.getPhone();
        this.address = user.getAddress();
        this.email = user.getEmail();
        this.password = user.getPassword();
        this.role = user.getRole().getKey();
    }
}
