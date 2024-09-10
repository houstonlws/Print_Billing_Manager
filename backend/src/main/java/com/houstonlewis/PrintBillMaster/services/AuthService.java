package com.houstonlewis.PrintBillMaster.services;

import com.houstonlewis.PrintBillMaster.dao.AccountDAO;
import com.houstonlewis.PrintBillMaster.dao.AuthDAO;
import com.houstonlewis.PrintBillMaster.models.User;
import com.houstonlewis.PrintBillMaster.utilities.JWTUtility;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;

import java.util.logging.Logger;

@Service
public class AuthService {

    private static final Logger logger = Logger.getLogger(AuthService.class.getName());

    private final AuthDAO authDAO;
    private final AccountDAO accountDAO;


    public AuthService(AuthDAO authDAO, AccountDAO accountDAO) {
        this.authDAO = authDAO;
        this.accountDAO = accountDAO;
    }

    public User login(User user) {
        String id = authDAO.validateLoginInfo(user.getEmail(), user.getPassword());
        User data = accountDAO.getUserData(id);
        return data;
    }

    public boolean register(User user) {
        boolean registered = authDAO.addLoginInfo(user.getEmail(), user.getPassword());
        if (registered) {
            String id = authDAO.validateLoginInfo(user.getEmail(), user.getPassword());
            user.setId(id);
            return authDAO.addUserInfo(user);
        }
        return false;
    }

    public String validateToken(String token) {
        try {
            return JWTUtility.decrypt(token);
        } catch (Exception e) {
            logger.severe(e.getMessage());
            return null;
        }
    }

    public String getAccessToken(User user) {
        user = accountDAO.getUserData(user.getId());
        return JWTUtility.createAccessToken(user.toString());
    }

    public String getRefreshToken(User user) {
        user = accountDAO.getUserData(user.getId());
        return JWTUtility.createRefreshToken(user.toString());
    }

    public HttpHeaders getHeaders(String accessToken, String refreshToken) {
        return JWTUtility.getHeaders(accessToken, refreshToken);
    }
}
