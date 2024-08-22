package com.houstonlewis.PrintBillMaster.controllers;


import com.houstonlewis.PrintBillMaster.models.Notification;
import com.houstonlewis.PrintBillMaster.models.User;
import com.houstonlewis.PrintBillMaster.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping()
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody User user) {
        System.out.println("logging in user");
        User data = authService.login(user);
        if (data != null) {
            System.out.println("login success");
            String access = authService.getAccessToken(data);
            String refresh = authService.getRefreshToken(data);
            HttpHeaders headers = authService.getHeaders(access, refresh);
            return ResponseEntity.ok().headers(headers).body(data);
        } else {
            System.out.println("login failure");
            return ResponseEntity.badRequest().body("invalid login info");
        }
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody User user) {
        System.out.println("registering");
        boolean registered = authService.register(user);
        if (registered) {
            System.out.println("register success");
            return ResponseEntity.ok("User registered");
        } else {
            System.out.println("register failure");
            return ResponseEntity.badRequest().body("User not registered");
        }
    }

    @GetMapping("/refreshToken")
    public ResponseEntity refreshToken(@RequestHeader(value = "Authorization") String accessToken, @CookieValue(value = "refreshToken") String refreshToken) {
        System.out.println("refreshing token");
        String decryptedAccess = authService.validateToken(accessToken);
        if (decryptedAccess != null) {
            System.out.println("token refreshed");
            User user = User.fromString(decryptedAccess);
            String access = authService.getAccessToken(user);
            HttpHeaders headers = authService.getHeaders(access, refreshToken);
            return ResponseEntity.ok().headers(headers).body(user);
        } else {
            String decryptedRefresh = authService.validateToken(refreshToken);
            if (decryptedRefresh != null) {
                System.out.println("token refreshed");
                User user = User.fromString(decryptedRefresh);
                String access = authService.getAccessToken(user);
                HttpHeaders headers = authService.getHeaders(access, refreshToken);
                return ResponseEntity.ok().headers(headers).body(user);
            } else {
                System.out.println("token invalid");
                return ResponseEntity.badRequest().body("invalid token");
            }
        }
    }

    @GetMapping("/user/get/{id}")
    public ResponseEntity getUserData(@PathVariable String id) {
        if (id.equalsIgnoreCase("*")) {
            System.out.println("Getting all user data");
            List<User> users = authService.getAllUsers();
            if (users == null) {
                System.out.println("problem getting users");
                return ResponseEntity.badRequest().body("Didn't get users");
            }
            System.out.println("got users successfully");
            return ResponseEntity.ok(users);
        } else {
            System.out.println("getting user data for user id: " + id);
            User user = authService.getUserData(id);
            if (user == null) {
                System.out.println("problem getting user data");
                return ResponseEntity.badRequest().body("Didn't get data");
            }
            System.out.println("got user data successfully");
            return ResponseEntity.ok(user);
        }
    }

    @PatchMapping("/user/update/{id}")
    public ResponseEntity updateUserData(@PathVariable String id, @RequestBody User data) {
        System.out.println("updating user data - id: " + id);
        boolean updated = authService.updateUserData(id, data);
        if (updated) {
            System.out.println("user data updated");
            return ResponseEntity.accepted().body(data);
        }
        System.out.println("problem updating user data");
        return ResponseEntity.badRequest().body("didn't update user data");
    }

    @GetMapping("/notifications/get/{id}")
    public ResponseEntity getNotifications(@PathVariable String id) {
        System.out.println("getting notifications");
        List<Notification> notifications = authService.getNotifications(id);
        if (notifications == null) {
            System.out.println("problem getting notifications");
            return ResponseEntity.badRequest().body("Didn't get notifications");
        }
        System.out.println("got notifications successfully");
        return ResponseEntity.ok(notifications);
    }

    @PatchMapping("/user/type")
    public ResponseEntity changeUserType(@RequestBody String[] users) {
        System.out.println("Updating user type(s)");
        boolean changed = authService.changeUserType(users);
        if (changed) {
            System.out.println("updated user type(s)");
            return ResponseEntity.ok("User types changed");
        } else {
            System.out.println("problem updating user type(s)");
            return ResponseEntity.badRequest().body("User types not changed");
        }
    }

    @GetMapping({"/getAllData", "/getAllData/{id}"})
    public ResponseEntity getAllData(@PathVariable(required = false) String id) {
        System.out.println("getting all data");
        Map<String, List<Object>> payload = authService.getAllData(id);
        return ResponseEntity.ok(payload);
    }

}
