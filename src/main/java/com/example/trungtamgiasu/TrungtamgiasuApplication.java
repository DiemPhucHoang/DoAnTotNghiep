package com.example.trungtamgiasu;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TrungtamgiasuApplication {
//    @Autowired
//    UserDAO userDAO;
//
//    @Autowired
//    RoleDAO roleDAO;
//
//    @Autowired
//    PasswordEncoder passwordEncoder;

    public static void main(String[] args) {
        SpringApplication.run(TrungtamgiasuApplication.class, args);
    }

//    @Bean
//    InitializingBean RoleDB() {
//        List<Role> roles = roleDAO.findAll();
//        if (roles.isEmpty()) {
//            roleDAO.save(new Role(1L, Role.ROLE_ADMIN));
//            roleDAO.save(new Role(2L, Role.ROLE_TUTOR));
//            roleDAO.save(new Role(3L, Role.ROLE_PARENT));
//        }
//        return null;
//    }
//
//    @Bean
//    InitializingBean sendDatabase() {
//        if (!userDAO.existsByName("admin") && !userDAO.existsByPhone("0987654321")){
//            return () -> {
//                User user = new User("admin", "0987654321", "Thủ Đức, TPHCM", "admin@gmail.com", "123456");
//                user.setPassword(passwordEncoder.encode(user.getPassword()));
//                Role role = roleDAO.findByName(Role.ROLE_ADMIN).orElseThrow(() -> new AppException("User Role not set"));
//                user.setRoles(Collections.singleton(role));
//                userDAO.save(user);
//            };
//        }
//        return null;
//    }

}
