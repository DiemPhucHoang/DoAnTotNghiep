package com.example.trungtamgiasu.vo.User;

import com.example.trungtamgiasu.model.Tutor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
@Setter
public class UserInfoVO {
    private Long id;

    @NotBlank
    private String name;

    @NotBlank
    @Size(min = 10, max = 11)
    private String phone;

    @NotBlank
    private String address;

    @Email
    private String email;

    private Tutor tutor;

}
