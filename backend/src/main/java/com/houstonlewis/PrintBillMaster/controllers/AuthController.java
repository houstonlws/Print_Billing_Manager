package com.houstonlewis.PrintBillMaster.controllers;


import com.houstonlewis.PrintBillMaster.models.User;
import com.houstonlewis.PrintBillMaster.services.AccountService;
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
    private final AccountService accountService;

    public AuthController(AuthService authService, AccountService accountService) {
        this.authService = authService;
        this.accountService = accountService;
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
        logger.info("validating access token");
        String decryptedAccess = authService.validateToken(accessToken);
        if (decryptedAccess == null) {
            logger.warning("access token expired");
            logger.info("checking refresh token");
            String decryptedRefresh = authService.validateToken(refreshToken);
            if (decryptedRefresh == null) {
                logger.warning("refresh token invalid");
                return ResponseEntity.badRequest().body(null);
            } else {
                logger.fine("access token refreshed");
                User user = User.fromString(decryptedRefresh);
                User updated = accountService.getUserData(user.getId());
                String access = authService.getAccessToken(updated);
                HttpHeaders headers = authService.getHeaders(access, refreshToken);
                return ResponseEntity.ok().headers(headers).body(updated);
            }
        } else {
            logger.info("access token valid");
            logger.fine("access token refreshed");
            User user = User.fromString(decryptedAccess);
            User updated = accountService.getUserData(user.getId());
            String access = authService.getAccessToken(updated);
            HttpHeaders headers = authService.getHeaders(access, refreshToken);
            return ResponseEntity.ok().headers(headers).body(updated);
        }
    }

    @GetMapping("/logout")
    public ResponseEntity<String> logout() {
        logger.info("logging out user");
        HttpHeaders headers = authService.logout();
        logger.info("logout success");
        return ResponseEntity.ok().headers(headers).body("logged out");
    }

}
