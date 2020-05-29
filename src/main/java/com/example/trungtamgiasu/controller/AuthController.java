package com.example.trungtamgiasu.controller;

import com.example.trungtamgiasu.dao.RoleDAO;
import com.example.trungtamgiasu.dao.UserDAO;
import com.example.trungtamgiasu.exception.AppException;
import com.example.trungtamgiasu.model.Role;
import com.example.trungtamgiasu.model.RoleName;
import com.example.trungtamgiasu.model.User;
import com.example.trungtamgiasu.security.JwtTokenProvider;
import com.example.trungtamgiasu.security.UserPrincipal;
import com.example.trungtamgiasu.service.UserService;
import com.example.trungtamgiasu.vo.User.ChangeInfoUserVO;
import com.example.trungtamgiasu.vo.User.ChangePasswordVO;
import com.example.trungtamgiasu.vo.User.UserVO;
import com.example.trungtamgiasu.vo.payload.ApiResponse;
import com.example.trungtamgiasu.vo.payload.JwtAuthenticationResponse;
import com.example.trungtamgiasu.vo.payload.LoginRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.Collections;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    Logger logger = LoggerFactory.getLogger(this.getClass().getName());
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserDAO userDAO;

    @Autowired
    RoleDAO roleDAO;

    @Autowired
    UserService userService;

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

    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_TUTOR')")
    @GetMapping()
    public ApiResponse getUser(Authentication auth)
    {
        UserPrincipal userDetails = (UserPrincipal) auth.getPrincipal();
        String phone = userDetails.getPhone();
        logger.info("Get user by phone: "+ phone);
        return new ApiResponse(
                true,
                "Get user successfully",
                userService.getByPhone(phone));
    }

    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_TUTOR')")
    @PatchMapping()
    public ResponseEntity<?> changePassword(@Valid @RequestBody ChangePasswordVO changePasswordVO, Authentication auth) {
        logger.info("Change password");
        return ResponseEntity.ok(
                new ApiResponse(true, "Change password successfully"));
    }

    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_TUTOR')")
    @PostMapping("/{idUser}")
    public ApiResponse changeInfoUser(@PathVariable("idUser") Long idUser, Authentication auth,
                                      @Valid @RequestBody ChangeInfoUserVO changeInfoUserVO) {
        logger.info("Change info user");
        return new ApiResponse(
                true,
                "Change info user successfully",
                userService.changeInfoUser(idUser, changeInfoUserVO, auth));
    }



}
