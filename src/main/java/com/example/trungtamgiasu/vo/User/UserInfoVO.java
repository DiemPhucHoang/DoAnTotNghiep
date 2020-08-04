package com.example.trungtamgiasu.vo.User;


import com.example.trungtamgiasu.model.Role;;
import com.example.trungtamgiasu.model.User;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Set;

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

    private byte[] image;

    private String role;

    public UserInfoVO(User user) {
        this.id = user.getId();
        this.name = user.getName();
        this.phone = user.getPhone();
        this.address = user.getAddress();
        this.email = user.getEmail();
        Set<Role> roles = user.getRoles();
        this.role = roles.iterator().next().getName().toString();
    }

    public UserInfoVO() {
    }
}
