package com.codeback.web.controller;

import com.codeback.domain.code.Code;
import com.codeback.service.code.CodeService;
import com.codeback.util.SecurityCipher;
import com.codeback.web.dto.CodeSaveRequestDto;
import com.codeback.web.dto.CodeSearchResponseDto;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@Api(tags = {"Code"})
@RequiredArgsConstructor
@RestController
@RequestMapping("/code")
public class CodeController {
    private final CodeService codeService;

    @Value("${tokenSecret}")
    private String key;

    @ApiOperation(value = "코드 저장", notes = "코드타이틀,코드설명,코드내용을 입력받아 저장")
    @PostMapping("")
    public ResponseEntity<?> saveCode(@CookieValue(name = "accessToken", required = false) String accessToken, @RequestBody CodeSaveRequestDto codeSaveRequestDto){
        try{
            //유저번호를 알아야 코드 저장이 가능함 그럴려면 유저번호를 받아야됨 -> 방법은?
            //이메일로 유저 번호 찾은다음 저장하는걸로 퉁
            String decryptedAccessToken = SecurityCipher.decrypt(accessToken);

            Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(decryptedAccessToken).getBody();
            String email = claims.get("sub").toString();

            System.out.println(email);
            System.out.println(codeSaveRequestDto.getCodeContent());
            codeService.saveCode(email, codeSaveRequestDto);

            return new ResponseEntity<>("성공잼",HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>("이게왜 실패지", HttpStatus.BAD_REQUEST);
        }

    }

    @ApiOperation(value = "사용자가 저장한 코드 내역 확인", notes = "액세스토큰받아서 사용자가 저장한 내역을 보내줌")
    @GetMapping("/mycode")
    public ResponseEntity<?> getMyCode(@CookieValue(name = "accessToken", required = false) String accessToken){
        try {
            //액세스 토큰안에 있는 이메일 주소로 코드 내역을 확인해서 리턴
            String decryptedAccessToken = SecurityCipher.decrypt(accessToken);
            Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(decryptedAccessToken).getBody();
            String email = claims.get("sub").toString();

            System.out.println(email);
            List<CodeSearchResponseDto> codes = codeService.findByCodeWithEmail(email);

            System.out.println(codes.get(0));

            return new ResponseEntity<>(codes, HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }

    @ApiOperation(value = "코드 하나 읽기", notes = "코드넘버 입력해주면 사용자확인하고 내용들 리턴")
    @GetMapping("/coderead/{codeNumber}")
    public ResponseEntity<?> deleteRoom(@CookieValue(name = "accessToken", required = false) String accessToken, @PathVariable long codeNumber){
        try {
            //해당 코드가 내꺼인지 확인하고 맞으면 정보 보여주기
            //다른 이메일로 접속해서 볼려고하면 패스
            String decryptedAccessToken = SecurityCipher.decrypt(accessToken);

            Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(decryptedAccessToken).getBody();
            String email = claims.get("sub").toString();

            CodeSearchResponseDto dto = codeService.getCodeByCodeNumber(email,codeNumber);
            System.out.println(dto.getCodeTitle());

           // roomService.deleteRoom(claims.get("sub").toString());
            return new ResponseEntity<>(dto, HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }
}
