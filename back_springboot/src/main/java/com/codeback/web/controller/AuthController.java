package com.codeback.web.controller;
import com.codeback.domain.jwt.JwtFilter;
import com.codeback.domain.jwt.TokenProvider;
import com.codeback.domain.user.User;
import com.codeback.service.email.EmailService;
import com.codeback.service.user.UserService;
import com.codeback.util.SecurityCipher;
import com.codeback.web.dto.*;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
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

import javax.mail.MessagingException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.io.IOException;
import java.sql.Struct;
import java.util.Optional;
import java.util.Random;

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

    @Autowired
    private EmailService emailService;

    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    @Value("${signUpCookieName}")
    private String signUpCookieName;

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


    }


    @PostMapping(value = "/refresh", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<LoginResponseDto> refreshToken(@CookieValue(name = "accessToken", required = false) String accessToken,
                                                      @CookieValue(name = "refreshToken", required = false) String refreshToken) {
        String decryptedAccessToken = SecurityCipher.decrypt(accessToken);
        String decryptedRefreshToken = SecurityCipher.decrypt(refreshToken);
        return userService.refresh(decryptedAccessToken, decryptedRefreshToken);
    }

    @GetMapping(value = "duplicate/email/{email}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> duplicateEmailCheck(@PathVariable String email) {
        Optional<User> user = userService.findUserByEmail(email);
        if(user.isPresent())
            return new ResponseEntity<>(HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @GetMapping(value = "duplicate/nickname/{nickname}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> duplicateNickNameCheck(@PathVariable String nickname) {
        Optional<User> user = userService.findUserByNickname(nickname);
        if(user.isPresent())
            return new ResponseEntity<>(HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @PostMapping(value = "email/req")
    public ResponseEntity<?> emailAuth(HttpServletRequest request, @RequestBody EmailAuthRequestDto requestDto) throws MessagingException {
        String email = requestDto.getEmail();
        Optional<User> user = userService.findUserByEmail(email);
        System.out.println(email);
        // 쿠키에 회원가입 진행 중이라는 signup 쿠키 없으면 잘못된 접근
        Cookie[] cookies = request.getCookies();
        System.out.println(cookies.length);
        for (Cookie cookie : cookies) {

            if (signUpCookieName.equals(cookie.getName())) {

                String signUpCookie = cookie.getValue();
                if (signUpCookie == null)
                    return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }

        // 6자리수 랜덤 수 생성
        StringBuffer emailcontent = new StringBuffer();
        Random random = new Random();
        StringBuffer buffer = new StringBuffer();
        int num = 0;

        while(buffer.length() < 6) {
            num = random.nextInt(10);
            buffer.append(num);
        }

        String auth_code = buffer.toString();

        // 생성된 코드를 redis에 key: email value:auth code로 저장
        ValueOperations<String, String> vop = redisTemplate.opsForValue();
        vop.set(email, auth_code);

        emailcontent.append("<!DOCTYPE html>");
        emailcontent.append("<html>");
        emailcontent.append("<head>");
        emailcontent.append("</head>");
        emailcontent.append("<body>");
        emailcontent.append(
                " <div" 																																																	+
                        "	style=\"font-family: 'Apple SD Gothic Neo', 'sans-serif' !important; width: 400px; height: 600px; border-top: 4px solid #DF01A5; margin: 100px auto; padding: 30px 0; box-sizing: border-box;\">"		+
                        "	<h1 style=\"margin: 0; padding: 0 5px; font-size: 28px; font-weight: 400;\">"																															+
                        "		<span style=\"font-size: 15px; margin: 0 0 10px 3px;\">CODE BACK</span><br />"																													+
                        "		<span style=\"color: #FA58D0\">메일인증</span> 안내입니다."																																				+
                        "	</h1>\n"																																																+
                        "	<p style=\"font-size: 16px; line-height: 26px; margin-top: 50px; padding: 0 5px;\">"																																													+
                        "		codeback에 가입해 주셔서 진심으로 감사드립니다.<br />"																																						+
                        "		아래 <b style=\"color: #FA58D0\">'메일 인증'</b> 코드를 입력 하셔서 회원가입을 완료해 주세요.<br />"																													+
                        "		감사합니다."																																															+
                        "	</p>"																																																	+
                        "		<p"																																																	+
                        "			style=\"display: inline-block; width: 210px; height: 45px; margin: 30px 5px 40px; background: #F6CEEC; line-height: 45px; vertical-align: middle; font-size: 16px;\">"							+
                        "			code : " +auth_code +"</p>"																																														+
                        "	</a>"																																																	+
                        "	<div style=\"border-top: 1px solid #DF01A5; padding: 5px;\"></div>"																																		+
                        " </div>"
        );
        emailcontent.append("</body>");
        emailcontent.append("</html>");
        emailService.sendMail(email, "[CodeBack] 회원가입 인증 메일", emailcontent.toString());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    
}