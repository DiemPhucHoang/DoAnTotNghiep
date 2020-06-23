package com.example.trungtamgiasu.service;

import com.example.trungtamgiasu.dao.UserDAO;
import com.example.trungtamgiasu.exception.UserException;
import com.example.trungtamgiasu.model.User;
import com.example.trungtamgiasu.parsing.UserParsing;
import com.example.trungtamgiasu.vo.UserVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserDAO userDAO;

    @Autowired
    PasswordEncoder passwordEncoder;

    public void save(UserVO userVO) {
        try {
            User user = UserParsing.parseUserVOToEntity(userVO);
            user.setPassword(passwordEncoder.encode(userVO.getPassword()));
            userDAO.save(user);
        } catch (Exception e) {
            throw new UserException(e.getMessage());
        }
    }
}
