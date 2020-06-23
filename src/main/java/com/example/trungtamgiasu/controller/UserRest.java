package com.example.trungtamgiasu.controller;

import com.example.trungtamgiasu.service.UserService;
import com.example.trungtamgiasu.vo.UserVO;
import com.example.trungtamgiasu.vo.payload.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class UserRest {

    @Autowired
    private UserService userService;

    @PostMapping("/user")
    public ApiResponse addUser(@RequestBody UserVO userVO) {
        try {
            userService.save(userVO);
            return new ApiResponse(true, "Add user successfully");
        } catch (Exception e) {
            return new ApiResponse(false, "Add user failed", e);
        }
    }
}
