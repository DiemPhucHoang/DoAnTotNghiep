package com.example.trungtamgiasu.service;

import com.example.trungtamgiasu.model.User;
import com.example.trungtamgiasu.vo.User.ChangePasswordVO;
import com.example.trungtamgiasu.vo.User.ForgotPasswordVO;
import com.example.trungtamgiasu.vo.User.UserInfoVO;
import org.springframework.security.core.Authentication;
import org.springframework.web.multipart.MultipartFile;

public interface UserService {
    User saveUser(User user);

    User getById(Long idUser);

    UserInfoVO getByPhone(String phone);

    User getUserByAuthentication(Authentication auth);

    void changePassword(ChangePasswordVO changePasswordVO, Authentication auth);

    UserInfoVO changeInfoUser(Long idUser, UserInfoVO userInfoVO, Authentication auth);

    void createPasswordResetTokenForUser(User user, String token);

    User getByEmail(String email);

    void changePasswordForgot(ForgotPasswordVO passwordVO);

    User savePassword(User user, String password);

    boolean checkFileNameExist(String fileName, Long idUser);

    String changeFileNameIfExist(MultipartFile file, Long idUser);

    //??ko dung
    String uploadImage(MultipartFile file, Long idUser, Authentication auth);

    String changeImage(Long idUser, MultipartFile file, Authentication auth);
}
