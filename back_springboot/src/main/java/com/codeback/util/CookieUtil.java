package com.codeback.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpCookie;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

/**
 * @Author: TCMALTUNKAN - MEHMET ANIL ALTUNKAN
 * @Date: 22.11.2019:15:10, Cum
 **/
@Service
public class CookieUtil {
    @Value("${accessTokenCookieName}")
    private String accessTokenCookieName;

    @Value("${refreshTokenCookieName}")
    private String refreshTokenCookieName;

    @Value("${signUpCookieName}")
    private String signUpCookieName;

    @Value("${emailCookieName}")
    private String emailCookieName;

    public HttpCookie createAccessTokenCookie(String token, Long duration) {
        String encryptedToken = SecurityCipher.encrypt(token);
        return ResponseCookie.from(accessTokenCookieName, encryptedToken)
                .maxAge(duration)
                .httpOnly(true)
                .path("/")
                .sameSite("None")
                .secure(true)
                .build();
    }

    public HttpCookie createRefreshTokenCookie(String token, Long duration) {
        String encryptedToken = SecurityCipher.encrypt(token);
        return ResponseCookie.from(refreshTokenCookieName, encryptedToken)
                .maxAge(duration)
                .secure(true)
                .httpOnly(true)
                .sameSite("None")
                .path("/")
                .build();
    }

    public HttpCookie deleteAccessTokenCookie() {
        return ResponseCookie.from(accessTokenCookieName, "")
                .maxAge(0)
                .secure(true)
                .sameSite("None")
                .path("/")
                .build();
    }

    public HttpCookie createSignUpCookie() {
        return ResponseCookie.from(signUpCookieName, "ThisIsCookieForSignUp")
                .maxAge(300000)
                .path("/")
                .httpOnly(true)
                .sameSite("None")
                .secure(true)
                .build();
    }

    public HttpCookie createEmailCookie() {
        return ResponseCookie.from(emailCookieName, "ThisIsCookieForemail")
                .maxAge(300000)
                .path("/")
                .httpOnly(true)
                .sameSite("None")
                .build();
    }

    public String getAccessTokenFromCookie(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if(cookies==null){
            return null;
        }

        for (Cookie cookie : cookies) {
            if (accessTokenCookieName.equals(cookie.getName())) {
                String accessToken = cookie.getValue();
                if (accessToken == null) return null;

                return SecurityCipher.decrypt(accessToken);
            }
        }
        return null;
    }

    public String getRefreshTokenFromCookie(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if(cookies==null){
            return null;
        }

        for (Cookie cookie : cookies) {
            if (refreshTokenCookieName.equals(cookie.getName())) {
                String refreshToken = cookie.getValue();
                if (refreshToken == null) return null;

                return SecurityCipher.decrypt(refreshToken);
            }
        }
        return null;
    }
}