package com.example.trungtamgiasu.service.impl;

import com.example.trungtamgiasu.dao.UserDAO;
import com.example.trungtamgiasu.exception.BadRequestException;
import com.example.trungtamgiasu.exception.ResourceNotFoundException;
import com.example.trungtamgiasu.mapper.UserMapper;
import com.example.trungtamgiasu.model.User;
import com.example.trungtamgiasu.security.UserPrincipal;
import com.example.trungtamgiasu.service.UserService;
import com.example.trungtamgiasu.vo.User.ChangePasswordVO;
import com.example.trungtamgiasu.vo.User.UserInfoVO;
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

    @Autowired
    private UserMapper userMapper;

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
    public UserInfoVO getByPhone(String phone) {
        logger.info("Get user by phone " + phone);

        User user =  userDAO.findByPhone(phone).orElseThrow(() ->
                new ResourceNotFoundException("User", "phone" , phone));
        UserInfoVO userInfoVO = new UserInfoVO();
        userInfoVO.setTutor(user.getTutor());
        return userMapper.toUserInfoVO(user);
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
    public User changeInfoUser(Long idUser, UserInfoVO userInfoVO, Authentication auth) {
        User user = getUserByAuthentication(auth);
        if(!(idUser.equals(user.getId()))) {
            throw new ResourceNotFoundException("User", "id", idUser);
        }
        if (userDAO.existsByPhone(userInfoVO.getPhone())
                && !userInfoVO.getPhone().equals(user.getPhone())) {
            throw  new BadRequestException("Phone already exists");
        }
        user.setName(userInfoVO.getName());
        user.setPhone(userInfoVO.getPhone());
        user.setAddress(userInfoVO.getAddress());
        user.setEmail(userInfoVO.getEmail());
        logger.info("Update user by idUser" + user.getId());
        return saveUser(user);
    }
}
