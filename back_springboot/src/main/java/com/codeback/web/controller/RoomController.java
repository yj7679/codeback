package com.codeback.web.controller;

import com.codeback.domain.room.Room;
import com.codeback.service.room.RoomService;
import com.codeback.util.SecurityCipher;
import com.codeback.web.dto.RoomSaveRequestDto;
import com.codeback.web.dto.RoomVerifyDto;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.*;

import java.security.Key;
import java.util.Optional;

@Api(tags = {"Room"})
@RequiredArgsConstructor
@RestController
@RequestMapping("/room")
public class RoomController {
    private final RoomService roomService;



    @Value("${tokenSecret}")
    private String key;

    public Key getSignedKey(String secret) { // InitializingBean 에서 오버라이드 -> 빈이 생성되고 주입된후 시크릿 값을 Base64 Decode해서 key변수에 할당하려고
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        return Keys.hmacShaKeyFor(keyBytes);
    }
    // req: 유저 닉네임
    // res: 해시된 방 이름
    //jwt로 바꿔야함. jwt없이 user id로만 방만들기 기능
    @ApiOperation(value = "방 만들기", notes = "방 생성.")
    @PostMapping("")
    public ResponseEntity<?> makeRoom(@CookieValue(name = "accessToken", required = false) String accessToken){
        try{
            String decryptedAccessToken = SecurityCipher.decrypt(accessToken);

            Claims claims = Jwts.parserBuilder().setSigningKey(getSignedKey(key)).build().parseClaimsJws(decryptedAccessToken).getBody();
            System.out.println(claims.toString());
            String roomId = roomService.makeRoom(Long.parseLong(claims.get("userNumber").toString()));
            System.out.println(roomId);
            return new ResponseEntity<String>(roomId,HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }

    @ApiOperation(value = "방 삭제", notes = "방 삭제.")
    @DeleteMapping("")
    public ResponseEntity<?> deleteRoom(@CookieValue(name = "accessToken", required = false) String accessToken){


        try {
            String decryptedAccessToken = SecurityCipher.decrypt(accessToken);

            Claims claims = Jwts.parserBuilder().setSigningKey(getSignedKey(key)).build().parseClaimsJws(decryptedAccessToken).getBody();

            roomService.deleteByUserNumber(Long.parseLong(claims.get("userNumber").toString()));
            return new ResponseEntity<>(HttpStatus.OK);
        }
        catch (Exception e){
            // 비회원이 회원 가입 하는 경우
            System.out.println(e.getStackTrace());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }

    @ApiOperation(value = "방 유효성 검사", notes = "방 입장 유효한 url 체크")
    @PostMapping("/verification")
    public ResponseEntity<?> verifyRoom(@RequestBody RoomVerifyDto requestDto){
        try {
            String hash = requestDto.getHash();

            Optional<Room> roomOptional = roomService.verifyRoom(hash);
            if(roomOptional.isPresent()){

                // 방이 있으면 OK
                return new ResponseEntity<>(HttpStatus.OK);

            }
            else{
                // 없는 방에 접근 404
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }
        catch (Exception e){
            // HASH로 요청안하고 잘못된 요청 일때 400
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }
}
