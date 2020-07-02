package com.example.trungtamgiasu.service;

import com.example.trungtamgiasu.model.User;
import com.example.trungtamgiasu.vo.User.ChangePasswordVO;
import com.example.trungtamgiasu.vo.User.UserInfoVO;
import org.springframework.security.core.Authentication;

public interface UserService {
    User saveUser(User user);

    User getById(Long idUser);

    UserInfoVO getByPhone(String phone);

    User getUserByAuthentication(Authentication auth);

    void changePassword(ChangePasswordVO changePasswordVO, Authentication auth);

    User changeInfoUser(Long idUser, UserInfoVO userInfoVO, Authentication auth);
}
