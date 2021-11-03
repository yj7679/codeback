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

@Api(tags = {"User"})
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    //회원 가입 성공 실패는 status code로만 판단.
    @ApiOperation(value = "회원가입", notes = "회원가입 진행합니다.")
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody UserSaveRequestDto userRequestDto){
        if(!userRequestDto.isEmail_auth() || !userRequestDto.isEmail_no_duplicate() || !userRequestDto.isNickname_no_duplicate()){
            //하나라도 false이면 회원가입 불가능한 사용자

            System.out.println("no email check or no nickname check");
            System.out.println(userRequestDto.isNickname_no_duplicate());
            System.out.println(userRequestDto.isEmail_auth());
            System.out.println(userRequestDto.isEmail_no_duplicate());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        else{
            System.out.println("yes");

            userService.save(userRequestDto);
            return new ResponseEntity<>(HttpStatus.OK);
        }
    }


}
