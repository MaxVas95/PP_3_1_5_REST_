package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.security.Principal;
import java.util.Optional;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/api/user")
public class UserRestController {

    private UserService userService;

    @Autowired
    public UserRestController(UserService userService, RoleService roleService) {
        this.userService = userService;
    }

    // Получить информацию о текущем пользователе
    @GetMapping()
    public ResponseEntity<User> showUser(Principal principal) {
        Optional<User> userOptional = userService.findByUsername(principal.getName());
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return new ResponseEntity<>(user, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}


