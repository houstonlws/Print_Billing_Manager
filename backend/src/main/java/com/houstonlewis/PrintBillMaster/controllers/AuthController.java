package com.houstonlewis.PrintBillMaster.controllers;


import com.houstonlewis.PrintBillMaster.models.User;
import com.houstonlewis.PrintBillMaster.services.AuthService;
import com.houstonlewis.PrintBillMaster.utilities.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.logging.Logger;

@RestController
@RequestMapping()
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody User user) {
        logger.info("logging in user");
        User data = authService.login(user);
        if (data != null) {
            logger.info("login success");
            String access = authService.getAccessToken(data);
            String refresh = authService.getRefreshToken(data);
            HttpHeaders headers = authService.getHeaders(access, refresh);
            return ResponseEntity.ok().headers(headers).body(data);
        } else {
            logger.warning("login failure");
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        logger.info("registering");
        boolean registered = authService.register(user);
        if (registered) {
            logger.info("register success");
            return ResponseEntity.ok("User registered");
        } else {
            logger.warning("register failure");
            return ResponseEntity.badRequest().body("User not registered");
        }
    }

    @GetMapping("/refreshToken")
    public ResponseEntity<User> refreshToken(@RequestHeader(value = "Authorization") String accessToken, @CookieValue(value = "refreshToken") String refreshToken) {
        logger.info("refreshing token");
        String decryptedAccess = authService.validateToken(accessToken);
        if (decryptedAccess != null) {
            logger.info("token refreshed");
            User user = User.fromString(decryptedAccess);
            String access = authService.getAccessToken(user);
            HttpHeaders headers = authService.getHeaders(access, refreshToken);
            return ResponseEntity.ok().headers(headers).body(user);
        } else {
            String decryptedRefresh = authService.validateToken(refreshToken);
            if (decryptedRefresh != null) {
                logger.info("token refreshed");
                User user = User.fromString(decryptedRefresh);
                String access = authService.getAccessToken(user);
                HttpHeaders headers = authService.getHeaders(access, refreshToken);
                return ResponseEntity.ok().headers(headers).body(user);
            } else {
                logger.warning("token invalid");
                return ResponseEntity.badRequest().body(null);
            }
        }
    }

}
