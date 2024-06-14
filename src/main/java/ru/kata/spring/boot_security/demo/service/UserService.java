package ru.kata.spring.boot_security.demo.service;

import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;
import java.util.Optional;


public interface UserService {
    List<User> getAllUsers();

    User showUser(int id);

    void save(User user);

    void deleteUserById(int id);

    void edit(User user);

    Optional<User> findByUsername(String username);

}
