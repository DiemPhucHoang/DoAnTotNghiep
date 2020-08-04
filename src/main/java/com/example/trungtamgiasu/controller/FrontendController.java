package com.example.trungtamgiasu.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class FrontendController {
    @GetMapping("/")
    public String getUserApp(){
        return "/index.html";
    }
}
