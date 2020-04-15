package com.example.trungtamgiasu.vo.User;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
@Setter
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

}
