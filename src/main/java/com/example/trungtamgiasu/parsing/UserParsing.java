package com.example.trungtamgiasu.parsing;

import com.example.trungtamgiasu.exception.UserException;
import com.example.trungtamgiasu.model.enums.Role;
import com.example.trungtamgiasu.model.User;
import com.example.trungtamgiasu.vo.UserVO;

public class UserParsing {
    public static User parseUserVOToEntity(UserVO userVO)  {
        if(userVO == null){
            throw new UserException("Invalid userVO info");
        }

        Role role = null;
        if(userVO.getRole() != null) {
            role = Role.from(userVO.getRole());
            if(role == null) {
                throw new UserException("Value " + userVO.getRole() + " is invalid Role value");
            }
        }

        return new User(userVO.getName(), userVO.getPhone(), userVO.getAddress(), userVO.getEmail(), userVO.getPassword(), role);
    }
}