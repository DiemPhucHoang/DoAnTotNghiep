package com.example.trungtamgiasu.vo.User;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
@Setter
@NoArgsConstructor
public class ForgotPasswordVO {

    @NotBlank
    @Size(min = 6, max = 20)
    private String password;

    @NotBlank
    private String token;
}
