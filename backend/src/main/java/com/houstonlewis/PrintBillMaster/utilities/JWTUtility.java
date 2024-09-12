package com.houstonlewis.PrintBillMaster.utilities;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.houstonlewis.PrintBillMaster.config.EnvConfig;
import jakarta.servlet.http.Cookie;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;

import java.util.Calendar;
import java.util.Date;

@Component
public class JWTUtility {

    private static final Algorithm algorithm = Algorithm.HMAC256(EnvConfig.getEnv("jwt.refreshTokenSecret"));


    public static String createAccessToken(String data) {
        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.MINUTE, 15);
        Date exp = cal.getTime();
        return JWT.create()
                .withSubject(data)
                .withExpiresAt(exp)
                .sign(algorithm);
    }

    public static String createRefreshToken(String data) {
        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.DAY_OF_MONTH, 7);
        Date exp = cal.getTime();
        return JWT.create()
                .withSubject(data)
                .withExpiresAt(exp)
                .sign(algorithm);
    }

    public static String decrypt(String token) {
        DecodedJWT decodedJWT = JWT.decode(token);
        Date exp = decodedJWT.getExpiresAt();
        if (exp.before(new Date())) return null;
        return JWT.require(algorithm)
                .build()
                .verify(token)
                .getSubject();
    }

    public static HttpHeaders getHeaders(String accessToken, String refreshToken) {
        HttpHeaders headers = new HttpHeaders();
        Cookie cookie = new Cookie("refreshToken", refreshToken);
        cookie.setPath("/");
        cookie.setMaxAge(7 * 24 * 60 * 60);
        headers.add(HttpHeaders.SET_COOKIE, cookie.getName() + "=" + cookie.getValue() + "; Max-Age=" + cookie.getMaxAge());
        headers.add(HttpHeaders.AUTHORIZATION, accessToken);
        return headers;
    }

    public static HttpHeaders clearCookies() {
        HttpHeaders headers = new HttpHeaders();
        Cookie cookie = new Cookie("refreshToken", null);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        headers.add(HttpHeaders.SET_COOKIE, cookie.getName() + "=" + cookie.getValue() + "; Max-Age=" + cookie.getMaxAge());
        return headers;
    }
}
