package en.ensiteck.myresto.controller;

import en.ensiteck.myresto.dto.User;
import en.ensiteck.myresto.repository.UserRepository;
import en.ensiteck.myresto.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("user")
public class UserController {

    public UserService userService;

    public UserController(UserService userService){
        this.userService=userService;
    }

    @PostMapping("")
    public void createUser(@Valid @RequestBody User user){
        userService.createUser(user);
    }

}
