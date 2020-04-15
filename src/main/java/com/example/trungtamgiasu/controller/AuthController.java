package com.example.trungtamgiasu.controller;

import com.example.trungtamgiasu.dao.RoleDAO;
import com.example.trungtamgiasu.dao.UserDAO;
import com.example.trungtamgiasu.exception.AppException;
import com.example.trungtamgiasu.model.Role;
import com.example.trungtamgiasu.model.RoleName;
import com.example.trungtamgiasu.model.User;
import com.example.trungtamgiasu.security.JwtTokenProvider;
import com.example.trungtamgiasu.vo.User.UserVO;
import com.example.trungtamgiasu.vo.payload.ApiResponse;
import com.example.trungtamgiasu.vo.payload.JwtAuthenticationResponse;
import com.example.trungtamgiasu.vo.payload.LoginRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.Collections;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserDAO userDAO;

    @Autowired
    RoleDAO roleDAO;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired(required = false)
    JwtTokenProvider tokenProvider;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getPhone(),
                        loginRequest.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.generateToken(authentication);
        return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody UserVO userVO) {
        if (userDAO.existsByPhone(userVO.getPhone())) {
            return new ResponseEntity(new ApiResponse(false, "Phone is already use!"),
                    HttpStatus.BAD_REQUEST);
        }

        // create user
        User user = new User(userVO.getName(), userVO.getPhone(), userVO.getAddress(), userVO.getEmail(), userVO.getPassword());
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        Role userRole = roleDAO.findByName(RoleName.valueOf(userVO.getRole()))
                .orElseThrow(() -> new AppException("User Role not set"));

        user.setRoles(Collections.singleton(userRole));

        User result = userDAO.save(user);

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/api/users/{name}")
                .buildAndExpand(result.getName()).toUri();

        return ResponseEntity.created(location).body(
                new ApiResponse(true, "User registered successfully")
        );
    }
}
