package com.example.trungtamgiasu.parsing.impl;

import com.example.trungtamgiasu.model.User;
import com.example.trungtamgiasu.parsing.TutorParsing;
import com.example.trungtamgiasu.parsing.UserParsing;
import com.example.trungtamgiasu.vo.User.UserInfoVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserParsingImpl implements UserParsing {

    @Autowired
    private TutorParsing tutorParsing;

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
        if(user.getImage() != null) {
            userInfoVO.setImage(tutorParsing.readBytesFromFile(user.getId()));
        }
        return userInfoVO;
    }
}
