package com.example.trungtamgiasu.vo.payload;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class LoginRequest {
    @NotBlank
    private String phone;

    @NotBlank
    private String password;
}
