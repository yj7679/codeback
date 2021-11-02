package com.codeback.web.controller;

import com.codeback.service.room.RoomService;
import com.codeback.util.SecurityCipher;
import com.codeback.web.dto.RoomSaveRequestDto;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.*;

@Api(tags = {"Room"})
@RequiredArgsConstructor
@RestController
@RequestMapping("/room")
public class RoomController {
    private final RoomService roomService;



    @Value("${tokenSecret}")
    private String key;

    // req: 유저 닉네임
    // res: 해시된 방 이름
    //jwt로 바꿔야함. jwt없이 user id로만 방만들기 기능
    @ApiOperation(value = "방만들기", notes = "닉네임을 입력받아서 방을 만듭니다.")
    @PostMapping("/")
    public String makeRoom(@RequestBody RoomSaveRequestDto roomSaveRequestDto){
        System.out.println(roomSaveRequestDto.getNickname());
        return roomService.makeRoom(roomSaveRequestDto.getNickname());
    }
    @ApiOperation(value = "찐 방만들기", notes = "닉네임을 입력받아서 방을 만듭니다.")
    @PostMapping("/makeroom")
    public String read_makeRoom(@CookieValue(name = "accessToken", required = false) String accessToken){

        String decryptedAccessToken = SecurityCipher.decrypt(accessToken);

        Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(decryptedAccessToken).getBody();
        System.out.println(decryptedAccessToken);
        System.out.println("----------------------------------");
        System.out.println(claims.toString());

        return roomService.makeRoom(claims.get("sub").toString());
    }
}
