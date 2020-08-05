package com.example.trungtamgiasu.controller;

import com.example.trungtamgiasu.dao.RoleDAO;
import com.example.trungtamgiasu.dao.UserDAO;
import com.example.trungtamgiasu.exception.AppException;
import com.example.trungtamgiasu.model.Role;
import com.example.trungtamgiasu.model.User;
import com.example.trungtamgiasu.model.enums.RoleName;
import com.example.trungtamgiasu.parsing.UserParsing;
import com.example.trungtamgiasu.security.JwtTokenProvider;
import com.example.trungtamgiasu.security.UserPrincipal;
import com.example.trungtamgiasu.service.SimpleMailSenderService;
import com.example.trungtamgiasu.service.UserService;
import com.example.trungtamgiasu.vo.SearchUserVO;
import com.example.trungtamgiasu.vo.User.ChangePasswordVO;
import com.example.trungtamgiasu.vo.User.ForgotPasswordVO;
import com.example.trungtamgiasu.vo.User.UserInfoVO;
import com.example.trungtamgiasu.vo.User.UserVO;
import com.example.trungtamgiasu.vo.payload.ApiResponse;
import com.example.trungtamgiasu.vo.payload.JwtAuthenticationResponse;
import com.example.trungtamgiasu.vo.payload.LoginRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.Collections;
import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    Logger logger = LoggerFactory.getLogger(this.getClass().getName());

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    private SimpleMailSenderService simpleMailSenderService;

    @Value("${web.ip}")
    private String webIp;

    @Value("${web.port}")
    private String webPort;

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

    @Autowired
    private UserParsing userParsing;

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
        User user = new User(userVO.getName(), userVO.getPhone(), userVO.getAddress(),
                userVO.getEmail(), userVO.getPassword(), userVO.getImage());
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
    public ApiResponse getUser(Authentication auth) {
        try {
            UserPrincipal userDetails = (UserPrincipal) auth.getPrincipal();
            String phone = userDetails.getPhone();
            return new ApiResponse(true, "Get user successfully", userService.getByPhone(phone));
        } catch (Exception e) {
            return new ApiResponse(false, "Get user failed", e.toString());
        }

    }

    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_TUTOR')")
    @PatchMapping()
    public ApiResponse changePassword(@Valid @RequestBody ChangePasswordVO changePasswordVO, Authentication auth) {
        try {
            userService.changePassword(changePasswordVO, auth);
            return new ApiResponse(true, "Change password successfully");
        } catch (Exception e) {
            return new ApiResponse(false, "Change password failed", e.toString());
        }

    }

    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_TUTOR')")
    @PostMapping("/{idUser}")
    public ApiResponse changeInfoUser(@PathVariable("idUser") Long idUser, Authentication auth,
                                      @Valid @RequestBody UserInfoVO userInfoVO) {
        logger.info("Change info user");
        try {
            UserInfoVO user = userService.changeInfoUser(idUser, userInfoVO, auth);
            return new ApiResponse(true,"Change info user successfully", user);
        } catch (Exception e) {
            return new ApiResponse(false, "Change info user failed", e.toString());
        }
    }

    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_TUTOR')")
    @GetMapping("/{idUser}")
    public ApiResponse getUserById(@PathVariable("idUser") Long idUser) {
        try {
            UserInfoVO userInfoVO = userParsing.toUserInfoVO(userService.getById(idUser));
            return new ApiResponse(true, "Get user by id " + idUser + "successfully", userInfoVO);
        } catch (Exception e) {
            return new ApiResponse(false, "Get user failed", e.toString());
        }
    }

    @PostMapping("/forgot-password")
    public ApiResponse sendMail(@RequestParam("email") String email) {
        try {
            User user = userService.getByEmail(email);
            String token = UUID.randomUUID().toString();
            userService.createPasswordResetTokenForUser(user, token);
            simpleMailSenderService.constructResetTokenEmail(token, user);
            return new ApiResponse(true, "Send mail successfully");
        } catch (Exception e) {
            return new ApiResponse(false, "Send mail failed", e.toString());
        }

    }

    @PatchMapping("/change-password-forgot")
    public ApiResponse changePasswordForgot(@RequestBody ForgotPasswordVO forgotPasswordVO) {
        try {
            userService.changePasswordForgot(forgotPasswordVO);
            return new ApiResponse(true, "change password forgot successfully");
        } catch (Exception e) {
            return new ApiResponse(false, "change password forgot failed", e.toString());
        }
    }

    @PostMapping("/upload-image/{idUser}")
    public ApiResponse uploadImage(@RequestPart("file") MultipartFile file, @PathVariable("idUser") Long idUser,
                                   Authentication auth) {
        return new ApiResponse(
                true,
                "Upload image successfully",
                userService.uploadImage(file, idUser, auth));
    }

    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_TUTOR')")
    @PostMapping("/change-image/{idUser}")
    public ApiResponse changeImageTutor(@PathVariable("idUser") Long idUser,
                                        @RequestPart("file") MultipartFile file, Authentication auth)
    {
        logger.info("Change image by idUser" + idUser);
        return new ApiResponse(
                true,
                "Change image tutor successfully",
                userService.changeImage(idUser, file, auth));
    }

    @PostMapping("/addUser")
    public ApiResponse addUser(@RequestBody UserVO userVO) {
        try {
            return new ApiResponse(true,"Add user successfully", userService.addUser(userVO));
        } catch (Exception e) {
            return new ApiResponse(false,"Add user fail" + e.getMessage());
        }
    }

    @GetMapping("/all")
    public ApiResponse getAllUser(@PageableDefault(size = 6) Pageable pageable) {
        try {
            return new ApiResponse(true,"Get all user successfully", userService.findAll(pageable));
        } catch (Exception e) {
            return new ApiResponse(false,"Get all user fail " + e.getMessage());
        }
    }

    @PutMapping("")
    public ApiResponse updateUser(@RequestBody UserVO userVO) {
        try {
            userService.updateUser(userVO);
            return new ApiResponse(true,"Update user successfully");
        } catch (Exception e) {
            return new ApiResponse(false,"Update user fail" + e.getMessage());
        }
    }

    @PostMapping("/search")
    public ApiResponse getAllBySearch(@RequestBody SearchUserVO searchUserVO, @PageableDefault(size = 6)Pageable pageable) {
        try {
            Page<UserVO> userVOPage = userService.searchUsers(searchUserVO, pageable);
            return new ApiResponse(true, "Get all users by search successfully", userVOPage);
        } catch (Exception e) {
            return new ApiResponse(false, "Get all users by search failed", e.toString());
        }
    }

}
