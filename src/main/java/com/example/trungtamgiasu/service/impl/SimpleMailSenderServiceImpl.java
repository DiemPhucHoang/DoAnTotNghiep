package com.example.trungtamgiasu.service.impl;

import com.example.trungtamgiasu.model.User;
import com.example.trungtamgiasu.service.SimpleMailSenderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

@Component
public class SimpleMailSenderServiceImpl implements SimpleMailSenderService {

    @Autowired
    private JavaMailSender javaMailSender;
    @Value("${web.ip}")
    private String webIp;

    @Value("${web.port}")
    private String webPort;

    @Override
    public void sendMail(String email, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject(subject);
        message.setText(text);
        this.javaMailSender.send(message);
    }

    @Override
    public void constructResetTokenEmail(String token, User user) {
        String text = "Xin hãy click vào đường dẫn sau để đổi mật khẩu: ";

//        String url = webIp + ":" + webPort + "/recovery-password/" + token;
        String url = "http://localhost:3000" + "/recovery-password/" + token;

        sendMail(user.getEmail(), "[TTGS Ánh Dương] Yêu cầu thay đổi mật khẩu ", text + url);
    }
}
