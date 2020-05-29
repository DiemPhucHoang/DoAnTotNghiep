package com.example.trungtamgiasu.service;

import com.example.trungtamgiasu.model.User;
import com.example.trungtamgiasu.vo.User.ChangeInfoUserVO;
import com.example.trungtamgiasu.vo.User.ChangePasswordVO;
import org.springframework.security.core.Authentication;

public interface UserService {
    User saveUser(User user);

    User getById(Long idUser);

    User getByPhone(String phone);

    User getUserByAuthentication(Authentication auth);

    void changePassword(ChangePasswordVO changePasswordVO, Authentication auth);

    User changeInfoUser(Long idUser, ChangeInfoUserVO changeInfoUserVO, Authentication auth);
}
