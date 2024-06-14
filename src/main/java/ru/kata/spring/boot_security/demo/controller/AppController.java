package ru.kata.spring.boot_security.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class AppController {

    @RequestMapping("/admin")
    public String adminPage() {
        return "admin";
    }

    @RequestMapping("/user")
    public String userPage() {
        return "user";
    }
}
