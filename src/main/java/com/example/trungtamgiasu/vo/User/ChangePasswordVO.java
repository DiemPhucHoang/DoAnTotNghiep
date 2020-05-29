package com.example.trungtamgiasu.vo.User;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChangePasswordVO {

    @NotBlank
    private String oldPassword;

    @NotBlank
    @Size(min = 6, max = 20)
    private String newPassword;

}
