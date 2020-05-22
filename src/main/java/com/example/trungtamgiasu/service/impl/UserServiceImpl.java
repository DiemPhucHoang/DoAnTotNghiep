package com.example.trungtamgiasu.service.impl;

import com.example.trungtamgiasu.dao.UserDAO;
import com.example.trungtamgiasu.exception.UserException;
import com.example.trungtamgiasu.model.User;
import com.example.trungtamgiasu.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    Logger logger = LoggerFactory.getLogger(this.getClass().getName());

    @Autowired
    private UserDAO userDAO;

    @Override
    public User getById(Long idUser) {
        logger.info("Get user " + idUser);
        return userDAO.findById(idUser).orElseThrow(() -> new UserException("User not found by id " + idUser));
    }

}
