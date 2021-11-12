package com.codeback.web.controller;

import com.codeback.domain.user.User;
import com.codeback.service.user.UserService;
import com.codeback.util.SecurityCipher;
import com.codeback.web.dto.PasswordUpdateRequestDto;
import com.codeback.web.dto.UserSaveRequestDto;
import com.codeback.web.dto.UserUpdateRequestDto;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Api(tags = {"User"})
@RestController
@RequestMapping("/user")
public class UserController {

    @Value("${tokenSecret}")
    private String key;

    @Value("${emailCookieName}")
    private String emailCookieName;

    @Autowired
    private UserService userService;

    //회원 가입 성공 실패는 status code로만 판단.
    @ApiOperation(value = "회원가입", notes = "회원가입 진행합니다.")
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@CookieValue(name = "signUpCookie", required = false) String signUpCookie, @RequestBody UserSaveRequestDto userRequestDto, HttpServletResponse response) {
        try {
            if (signUpCookie == null) {
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            } else {
                userService.save(userRequestDto);

                // signup cookie 삭제
                Cookie temp = new Cookie("signUpCookie", null);
                temp.setMaxAge(0); // 쿠키의 expiration 타임을 0으로 하여 없앤다.
                temp.setPath("/");
                response.addCookie(temp);

                return new ResponseEntity<>(HttpStatus.OK);
            }
        } catch (Exception e) { // 중복된 아이디로 회원가입 한 경우
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(value = "회원정보 수정", notes = "이메일은 바꾸고자하는사람 | 닉네임,비밀번호는 바꾸고싶은거 입력")
    @PutMapping("")
    public ResponseEntity<?> update(@CookieValue(name = "accessToken", required = false) String accessToken, @RequestBody UserUpdateRequestDto userUpdateRequestDto) {
        try {
            String decryptedAccessToken = SecurityCipher.decrypt(accessToken);
            Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(decryptedAccessToken).getBody();
            //System.out.println(claims.get("sub").toString());
            userService.save((Long)claims.get("userNumber"), userUpdateRequestDto);

            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }

    @ApiOperation(value = "회원탈퇴", notes = "토큰을 받아서 회원탈퇴 진행")
    @DeleteMapping("")
    public ResponseEntity<?> deleteUser(@CookieValue(name = "accessToken", required = false) String accessToken) {
        try {
            String decryptedAccessToken = SecurityCipher.decrypt(accessToken);
            Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(decryptedAccessToken).getBody();
            //System.out.println(claims.get("sub").toString());
            userService.deleteUser(claims.get("userNumber").toString());

            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(value = "회원정보조회", notes = "토큰을 받아서 이메일,닉네임 반환")
    @GetMapping("")
    public ResponseEntity<?> searchUser(@CookieValue(name = "accessToken", required = false) String accessToken) {
        try {
            String decryptedAccessToken = SecurityCipher.decrypt(accessToken);
            Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(decryptedAccessToken).getBody();
            //System.out.println(claims.get("sub").toString());
            Optional<User> user = userService.findUserByEmail(claims.get("sub").toString());

            Map<String, Object> result = new HashMap<>();
            result.put("email", user.get().getEmail());
            result.put("nickname", user.get().getNickname());

            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(value = "비밀번호찾기", notes = "토큰이랑 이메일,비밀번호 받아서 비밀번호만 업데이트")
    @PutMapping("/passwordUpdate")
    public ResponseEntity<?> passwordUpdate(HttpServletRequest request,@RequestBody PasswordUpdateRequestDto passwordUpdateRequestDto) {
        try {
            System.out.println("2312312312312");
            String email = passwordUpdateRequestDto.getEmail();
            Optional<User> user = userService.findUserByEmail(email);
            Cookie[] cookies = request.getCookies();
            // 쿠키에 회원가입 진행 중이라는 signup 쿠키 없으면 잘못된 접근
            // 이메일이 db에없는 거면 잘못된 접근
            if(cookies == null || !user.isPresent()){
                System.out.println("UNAUTHORIZED");
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }
            for (Cookie cookie : cookies) {

                if (emailCookieName.equals(cookie.getName())) {

                    String emailCookie = cookie.getValue();
                    if (emailCookie == null)
                        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
                }
            }

            userService.updatePassword(passwordUpdateRequestDto);


            //Optional<User> user = userService.findUserByEmail(claims.get("sub").toString());


            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
