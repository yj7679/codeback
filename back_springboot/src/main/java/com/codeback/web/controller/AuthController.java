package com.codeback.web.controller;
import com.codeback.domain.jwt.JwtFilter;
import com.codeback.domain.jwt.TokenProvider;
import com.codeback.domain.user.User;
import com.codeback.service.user.UserService;
import com.codeback.util.SecurityCipher;
import com.codeback.web.dto.LoginRequestDto;
import com.codeback.web.dto.LoginResponseDto;
import com.codeback.web.dto.TokenDto;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

/**
 * @Author: TCMALTUNKAN - MEHMET ANIL ALTUNKAN
 * @Date: 30.12.2019:09:52, Pzt
 **/
@RestController
@RequestMapping("/auth")
public class AuthController {


    private final TokenProvider tokenProvider;

    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    @Autowired
    private UserService userService;

    public AuthController(TokenProvider tokenProvider, AuthenticationManagerBuilder authenticationManagerBuilder) {
        this.tokenProvider = tokenProvider;
        this.authenticationManagerBuilder = authenticationManagerBuilder;
    }

    // 로그인 및 토큰 발급
    @PostMapping("/authenticate")
    @ApiOperation(value = "로그인 및 인증", notes = "로그인 및 인증 토큰을 헤더 및 바디를 통해 반환", response = TokenDto.class)
    public ResponseEntity<LoginResponseDto> login(
            @CookieValue(name = "accessToken", required = false) String accessToken,
            @CookieValue(name = "refreshToken", required = false) String refreshToken,
            @Valid @RequestBody LoginRequestDto loginDto
    ){

        Optional<User> user = userService.findUserByEmail(loginDto.getEmail());

        System.out.println(loginDto.getEmail());
        System.out.println(loginDto.getPassword());
        // id,passoword를 통해 UsernamePasswordAuthenticationToken을 생성
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                loginDto.getEmail(), loginDto.getPassword());

        // 토큰으로 authenticate 실행되면 CustomUserDetailsService에 있는 loadUserByUsername 실행
        // 그 결과값으로 authentication객체 생성되고 이를 SecurityContext에 저장
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String decryptedAccessToken = SecurityCipher.decrypt(accessToken);
        String decryptedRefreshToken = SecurityCipher.decrypt(refreshToken);
        return userService.login(loginDto, decryptedAccessToken, decryptedRefreshToken);
        // 그 인증정보를 기반으로 jwt 토큰을 생성
//        String jwt = tokenProvider.createToken(authentication);
//        HttpHeaders httpHeaders = new HttpHeaders();
//        // 헤더에도 넣고
//        httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);
//
//        // 바디에도 넣어서 리턴
//        return new ResponseEntity<>(new TokenDto(jwt), httpHeaders, HttpStatus.OK);

    }

//
//    @PostMapping(value = "/refresh", produces = MediaType.APPLICATION_JSON_VALUE)
//    public ResponseEntity<LoginResponseDto> refreshToken(@CookieValue(name = "accessToken", required = false) String accessToken,
//                                                      @CookieValue(name = "refreshToken", required = false) String refreshToken) {
//        String decryptedAccessToken = SecurityCipher.decrypt(accessToken);
//        String decryptedRefreshToken = SecurityCipher.decrypt(refreshToken);
//        return userService.refresh(decryptedAccessToken, decryptedRefreshToken);
//    }
}