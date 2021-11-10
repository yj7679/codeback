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
import javax.servlet.http.HttpServletResponse;
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
    @PostMapping("/login")
    @ApiOperation(value = "로그인 및 인증", notes = "로그인 및 인증 토큰을 헤더 및 바디를 통해 반환", response = TokenDto.class)
    public ResponseEntity<LoginResponseDto> login(
            @Valid @RequestBody LoginRequestDto loginDto
    ){

        Optional<User> userOptional = userService.findUserByEmail(loginDto.getEmail());

        // 아이디 틀리면 401 RETURN
        if(!userOptional.isPresent()){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        // 비밀번호 틀리면 알아서 401 RETURN
        User user = userOptional.get();

        // id,passoword를 통해 UsernamePasswordAuthenticationToken을 생성
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                loginDto.getEmail(), loginDto.getPassword());

        // 토큰으로 authenticate 실행되면 CustomUserDetailsService에 있는 loadUserByUsername 실행
        // 그 결과값으로 authentication객체 생성되고 이를 SecurityContext에 저장
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        HttpHeaders responseHeaders = new HttpHeaders();
        TokenDto newAccessToken;
        TokenDto newRefreshToken;

        newAccessToken = tokenProvider.generateAccessToken(user.getEmail());
        newRefreshToken = tokenProvider.generateRefreshToken(user.getEmail());
        userService.addAccessTokenCookie(responseHeaders, newAccessToken);
        userService.addRefreshTokenCookie(responseHeaders, newRefreshToken);
        LoginResponseDto loginResponse = new LoginResponseDto(LoginResponseDto.SuccessFailure.SUCCESS, "Auth successful. Tokens are created in cookie.");
        return ResponseEntity.ok().headers(responseHeaders).body(loginResponse);
    }


    @PostMapping(value = "/refresh", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<LoginResponseDto> refreshToken(@CookieValue(name = "accessToken", required = false) String accessToken,
                                                      @CookieValue(name = "refreshToken", required = false) String refreshToken) {
        String decryptedAccessToken = SecurityCipher.decrypt(accessToken);
        String decryptedRefreshToken = SecurityCipher.decrypt(refreshToken);
        return userService.refresh(decryptedAccessToken, decryptedRefreshToken);
    }

    @GetMapping(value = "/duplicate/email/{email}")
    public ResponseEntity<?> duplicateEmailCheck(@PathVariable String email) {
        Optional<User> user = userService.findUserByEmail(email);
        System.out.println(email);
        if(!user.isPresent())
            return new ResponseEntity<>(HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @GetMapping(value = "/duplicate/nickname/{nickname}")
    public ResponseEntity<?> duplicateNickNameCheck(@PathVariable String nickname) {
        Optional<User> user = userService.findUserByNickname(nickname);
        if(!user.isPresent())
            return new ResponseEntity<>(HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @PostMapping(value = "/email/req")
    public ResponseEntity<?> emailAuth(HttpServletRequest request, @RequestBody EmailAuthRequestDto requestDto) throws MessagingException {
        String email = requestDto.getEmail();
        Optional<User> user = userService.findUserByEmail(email);


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


    @ApiOperation(value = "Email Auth Confirm", notes = "메일로 받은 인증번호를 누르고 확인")
    @PostMapping(value = "/email/confirm")
    public ResponseEntity<?> emailConfirm(HttpServletRequest request, @RequestBody EmailAuthConfirmDto requestDto) {
        String code = requestDto.getCode();
        String email = requestDto.getEmail();

        Optional<User> user = userService.findUserByEmail(email);

        ValueOperations<String, String> vop = redisTemplate.opsForValue();
        String storedCode = vop.get(email);



        // Redis에 저장된 중복검사된 이메일과 같은 경우
        if(storedCode.equals(code)){
            return new ResponseEntity<String>("true", HttpStatus.OK);
        }
        else{ // 다른 경우
            return new ResponseEntity<String>("false", HttpStatus.BAD_REQUEST);

        }
    }

    //----------------비밀번호 찾기용 이메일 인증 시작
    @PostMapping(value = "/emailWithPassword/req")
    public ResponseEntity<?> emailAuthWithPassword(HttpServletRequest request, @RequestBody EmailAuthRequestDto requestDto) throws MessagingException {
        String email = requestDto.getEmail();
        Optional<User> user = userService.findUserByEmail(email);



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
                        "		<span style=\"color: #FA58D0\">본인인증</span> 안내입니다."																																				+
                        "	</h1>\n"																																																+
                        "	<p style=\"font-size: 16px; line-height: 26px; margin-top: 50px; padding: 0 5px;\">"																																													+
                        "		비밀번호를 찾기위한 이메일 인증 요청 메일입니다.<br />"																																						+
                        "		아래 <b style=\"color: #FA58D0\">'메일 인증'</b> 코드를 입력 하셔서 본인확인을 완료해주세요.<br />"																													+
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
        emailService.sendMail(email, "[CodeBack] 본인인증 확인 메일", emailcontent.toString());
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @ApiOperation(value = "Email Auth Confirm WithPassword", notes = "메일로 받은 인증번호를 누르고 확인하면 이메일 인증된 쿠키 전송")
    @PostMapping(value = "/emailWithPassword/confirm")
    public ResponseEntity<?> emailConfirmWithPassword(HttpServletRequest request, @RequestBody EmailAuthConfirmDto requestDto) {
        String code = requestDto.getCode();
        String email = requestDto.getEmail();

        Optional<User> user = userService.findUserByEmail(email);

        ValueOperations<String, String> vop = redisTemplate.opsForValue();
        String storedCode = vop.get(email);


        // Redis에 저장된 중복검사된 이메일과 같은 경우
        if(storedCode.equals(code)){
            ResponseEntity<?> res = userService.addEmailCookie();
            return res;
        }
        else{ // 다른 경우
            return new ResponseEntity<String>("false",HttpStatus.OK);

        }
    }

    //------------------비밀번호찾기용 이메일 인증 끝

    @ApiOperation(value = "회원가입페이지로 이동", notes = "회원가입 전 쿠키에 회원가입 허가인증 정보를 넣습니다.")
    @GetMapping("/startsignup")
    public ResponseEntity<?> signupPage(){
        try {
            ResponseEntity<?> res = userService.addSignUpCookie();
            return res; //duration : 300sec
        }
        catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(value = "로그아웃", notes = "로그아웃")
    @GetMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response){
        try {
            Cookie accessToken = new Cookie("accessToken", null);
            Cookie refreshToken = new Cookie("refreshToken", null);
            accessToken.setMaxAge(0); // 쿠키의 expiration 타임을 0으로 하여 없앤다.
            refreshToken.setMaxAge(0); // 쿠키의 expiration 타임을 0으로 하여 없앤다.
            accessToken.setPath("/");
            refreshToken.setPath("/"); // 모든 경로에서 삭제 됬음을 알린다.
            response.addCookie(accessToken);
            response.addCookie(refreshToken);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}