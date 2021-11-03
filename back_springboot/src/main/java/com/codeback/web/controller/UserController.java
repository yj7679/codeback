package com.codeback.web.controller;

import com.codeback.domain.user.User;
import com.codeback.service.user.UserService;
import com.codeback.web.dto.UserSaveRequestDto;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

@Api(tags = {"User"})
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    //회원 가입 성공 실패는 status code로만 판단.
    @ApiOperation(value = "회원가입", notes = "회원가입 진행합니다.")
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@CookieValue(name = "signUpCookie", required = false) String signUpCookie, @RequestBody UserSaveRequestDto userRequestDto, HttpServletResponse response){
        try {
            if(signUpCookie==null) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
            else{
                userService.save(userRequestDto);

                // signup cookie 삭제
                Cookie temp = new Cookie("signUpCookie", null);
                temp.setMaxAge(0); // 쿠키의 expiration 타임을 0으로 하여 없앤다.
                temp.setPath("/");
                response.addCookie(temp);

                return new ResponseEntity<>(HttpStatus.OK);
            }
        }
        catch (Exception e){ // 중복된 아이디로 회원가입 한 경우
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }


}
