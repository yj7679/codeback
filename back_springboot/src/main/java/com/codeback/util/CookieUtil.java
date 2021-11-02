package com.codeback.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpCookie;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;

/**
 * @Author: TCMALTUNKAN - MEHMET ANIL ALTUNKAN
 * @Date: 22.11.2019:15:10, Cum
 **/
@Component
public class CookieUtil {
    @Value("${accessTokenCookieName}")
    private String accessTokenCookieName;

    @Value("${refreshTokenCookieName}")
    private String refreshTokenCookieName;

    @Value("${signUpCookieName}")
    private String signUpCookieName;

    public HttpCookie createAccessTokenCookie(String token, Long duration) {
        String encryptedToken = SecurityCipher.encrypt(token);
        return ResponseCookie.from(accessTokenCookieName, encryptedToken)
                .maxAge(duration)
                .path("/")
                .build();
    }

    public HttpCookie createRefreshTokenCookie(String token, Long duration) {
        String encryptedToken = SecurityCipher.encrypt(token);
        return ResponseCookie.from(refreshTokenCookieName, encryptedToken)
                .maxAge(duration)
                .path("/")
                .build();
    }

    public HttpCookie deleteAccessTokenCookie() {
        return ResponseCookie.from(accessTokenCookieName, "").maxAge(0).path("/").build();
    }

    public HttpCookie createSignUpCookie() {
        return ResponseCookie.from(signUpCookieName, "ThisIsCookieForSignUp")
                .maxAge(300000)
                .path("/")
                .build();
    }
}