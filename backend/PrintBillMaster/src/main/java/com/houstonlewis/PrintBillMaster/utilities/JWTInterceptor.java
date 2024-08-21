package com.houstonlewis.PrintBillMaster.utilities;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.houstonlewis.PrintBillMaster.config.EnvConfig;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class JWTInterceptor implements HandlerInterceptor {

    private final JWTVerifier jwtVerifier;
    private final Algorithm algorithm = Algorithm.HMAC256(EnvConfig.getEnv("jwt.refreshTokenSecret"));

    public JWTInterceptor() {
        jwtVerifier = JWT.require(algorithm).build();
    }

    @Override
    public boolean preHandle(HttpServletRequest req, HttpServletResponse res, Object handler) throws Exception {
        String authHeader = req.getHeader("Authorization");
        System.out.println(authHeader);
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            res.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return false;
        }
        String token = authHeader.substring(7);
        try {
            DecodedJWT decodedJWT = jwtVerifier.verify(token);
            req.setAttribute("user", decodedJWT.getSubject());
        } catch (Exception e) {
            System.out.println(e.getMessage());
            res.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return false;
        }
        return false;
    }

}
