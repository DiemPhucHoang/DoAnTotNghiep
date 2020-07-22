package com.example.trungtamgiasu.service;

import com.example.trungtamgiasu.model.User;

public interface SimpleMailSenderService {

    void sendMail(String email,String subject, String text);

    void constructResetTokenEmail(String token, User user);
}
