package com.example.trungtamgiasu.service.impl;

import com.example.trungtamgiasu.dao.UserDAO;
import com.example.trungtamgiasu.exception.BadRequestException;
import com.example.trungtamgiasu.exception.ResourceNotFoundException;
import com.example.trungtamgiasu.model.User;
import com.example.trungtamgiasu.security.UserPrincipal;
import com.example.trungtamgiasu.service.UserService;
import com.example.trungtamgiasu.vo.User.ChangeInfoUserVO;
import com.example.trungtamgiasu.vo.User.ChangePasswordVO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    Logger logger = LoggerFactory.getLogger(this.getClass().getName());

    @Autowired
    private UserDAO userDAO;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public User saveUser(User user) {
        logger.info("Save user with id: " + user.getId());
        return userDAO.save(user);
    }

    @Override
    public User getById(Long idUser) {
        logger.info("Get user by id " + idUser);
        return userDAO.findById(idUser).orElseThrow(() ->
                new ResourceNotFoundException("User", "id" , idUser));
    }

    @Override
    public User getByPhone(String phone) {
        logger.info("Get user by phone " + phone);
        return  userDAO.findByPhone(phone).orElseThrow(() ->
                new ResourceNotFoundException("User", "phone" , phone));
    }

    @Override
    public User getUserByAuthentication(Authentication auth) {
        logger.info("Get user by authentication");
        UserPrincipal userPrincipal = (UserPrincipal) auth.getPrincipal();
        return userDAO.findByPhone(userPrincipal.getPhone()).orElseThrow(() ->
                new ResourceNotFoundException("User", "phone" , userPrincipal.getPhone()));
    }

    @Override
    public void changePassword(ChangePasswordVO changePasswordVO, Authentication auth) {
        User user = getUserByAuthentication(auth);
        if(!(passwordEncoder.matches(changePasswordVO.getOldPassword(), user.getPassword()))) {
            throw new BadRequestException("Password does not match with the old password");
        }
        logger.info("Change password by idUser " + user.getId());
        userDAO.changePassword(passwordEncoder.encode(changePasswordVO.getNewPassword()), user.getId());
    }

    @Override
    public User changeInfoUser(Long idUser, ChangeInfoUserVO changeInfoUserVO, Authentication auth) {
        User user = getUserByAuthentication(auth);
        if(!(idUser.equals(user.getId()))) {
            throw new ResourceNotFoundException("User", "id", idUser);
        }
        if (userDAO.existsByPhone(changeInfoUserVO.getPhone())
                && !changeInfoUserVO.getPhone().equals(user.getPhone())) {
            throw  new BadRequestException("Phone already exists");
        }
        user.setName(changeInfoUserVO.getName());
        user.setPhone(changeInfoUserVO.getPhone());
        user.setAddress(changeInfoUserVO.getAddress());
        user.setEmail(changeInfoUserVO.getEmail());
        logger.info("Update user by idUser" + user.getId());
        return saveUser(user);
    }
}
