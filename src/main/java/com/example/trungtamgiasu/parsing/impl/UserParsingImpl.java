package com.example.trungtamgiasu.parsing.impl;

import com.example.trungtamgiasu.model.Role;
import com.example.trungtamgiasu.model.User;
import com.example.trungtamgiasu.parsing.TutorParsing;
import com.example.trungtamgiasu.parsing.UserParsing;
import com.example.trungtamgiasu.vo.User.UserInfoVO;
import com.example.trungtamgiasu.vo.User.UserVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Component
public class UserParsingImpl implements UserParsing {

    @Autowired
    private TutorParsing tutorParsing;

    @Override
    public User parseUserVOToEntity(UserVO userVO) {
        if (userVO == null) {
            return null;
        }

        return new User(userVO.getName(), userVO.getPhone(), userVO.getAddress(), userVO.getEmail());
    }

    @Override
    public List<UserVO> toUserVOList(List<User> users) {
        if (users == null) {
            return null;
        }
        List<UserVO> userVOS = new ArrayList<>();
        for (User user : users) {
            userVOS.add(new UserVO(user));
        }
        return userVOS;
    }
    @Override
    public User toUser(UserInfoVO userInfoVO) {
        if(userInfoVO == null) {
            return null;
        }
        User user = new User();
        user.setId(userInfoVO.getId());
        user.setName(userInfoVO.getName());
        user.setPhone(userInfoVO.getPhone());
        user.setAddress(userInfoVO.getAddress());
        user.setEmail(userInfoVO.getEmail());
        return user;
    }

    @Override
    public UserInfoVO toUserInfoVO(User user) {
        if(user == null) {
            return null;
        }
        UserInfoVO userInfoVO = new UserInfoVO();
        userInfoVO.setId(user.getId());
        userInfoVO.setName(user.getName());
        userInfoVO.setPhone(user.getPhone());
        userInfoVO.setAddress(user.getAddress());
        userInfoVO.setEmail(user.getEmail());
        Set<Role> roles = user.getRoles();
        userInfoVO.setRole(roles.iterator().next().getName().toString());
        if(user.getImage() != null) {
            userInfoVO.setImage(tutorParsing.readBytesFromFile(user.getId()));
        }
        return userInfoVO;
    }
}
