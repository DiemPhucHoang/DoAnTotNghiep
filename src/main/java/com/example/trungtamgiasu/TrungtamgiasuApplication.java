package com.example.trungtamgiasu;

import com.example.trungtamgiasu.dao.RoleDAO;
import com.example.trungtamgiasu.dao.UserDAO;
import com.example.trungtamgiasu.exception.AppException;
import com.example.trungtamgiasu.model.Role;
import com.example.trungtamgiasu.model.RoleName;
import com.example.trungtamgiasu.model.User;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Collections;
import java.util.List;

@SpringBootApplication
public class TrungtamgiasuApplication {
    @Autowired
    UserDAO userDAO;

    @Autowired
    RoleDAO roleDAO;

    @Autowired
    PasswordEncoder passwordEncoder;

    public static void main(String[] args) {
        SpringApplication.run(TrungtamgiasuApplication.class, args);
    }

    @Bean
    InitializingBean RoleDB() {
        List<Role> roles = roleDAO.findAll();
        if (roles.isEmpty()) {
            roleDAO.save(new Role(1L, RoleName.ROLE_ADMIN));
            roleDAO.save(new Role(2L, RoleName.ROLE_TUTOR));
            roleDAO.save(new Role(3L, RoleName.ROLE_PARENT));
        }
        return null;
    }

    @Bean
    InitializingBean sendDatabase() {
        if (!userDAO.existsByName("admin") && !userDAO.existsByPhone("0987654321")){
            return () -> {
                User user = new User("admin", "0987654321", "Thủ Đức, TPHCM", "admin@gmail.com", "123456");
                user.setPassword(passwordEncoder.encode(user.getPassword()));
                Role role = roleDAO.findByName(RoleName.ROLE_ADMIN).orElseThrow(() -> new AppException("User Role not set"));
                user.setRoles(Collections.singleton(role));
                userDAO.save(user);
            };
        }
        return null;
    }

}
