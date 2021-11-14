package com.codeback.service.code;

import com.codeback.domain.code.Code;
import com.codeback.domain.code.CodeRepository;
import com.codeback.domain.room.Room;
import com.codeback.domain.room.RoomRepository;
import com.codeback.domain.user.User;
import com.codeback.domain.user.UserRepository;
import com.codeback.web.dto.CodeSaveRequestDto;
import com.codeback.web.dto.CodeSearchResponseDto;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.*;

@RequiredArgsConstructor
@Service
public class CodeService {

    private final CodeRepository codeRepository;
    private final UserRepository userRepository;


    public String saveCode(String UserEmail, CodeSaveRequestDto codeSaveRequestDto) {

        //시간 저장을 DB에서 ㅇ자동으로 하게 해놨는데 이러니까 8시간 차이남
        //이거 고쳐야함
        Optional<User> user = userRepository.findByEmail(UserEmail);
        User userEntity = user.get();


        //현재시간 설정 - mysql은 DateTime
        LocalDateTime now = LocalDateTime.now();


        Code code = Code.builder()
                .user(userEntity)
                .codeContent(codeSaveRequestDto.getCodeContent())
                .codeTitle(codeSaveRequestDto.getCodeTitle())
                .codeDes(codeSaveRequestDto.getCodeDes())
                .codeDate(now)
                .build();

        System.out.println(code.getCodeContent());
        System.out.println(code.getCodeDate());
        System.out.println(code.getUser().getUserNumber());



        codeRepository.save(code);

        return "성공";

    }


    public List<CodeSearchResponseDto> findByCodeWithEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        User userEntity = user.get();

        List<Code> codes = codeRepository.findAllByUserUserNumber(userEntity.getUserNumber());


        List<CodeSearchResponseDto> result = new ArrayList<>();

        System.out.println(result.size());
        for(Code code: codes){
            CodeSearchResponseDto dto = new CodeSearchResponseDto(
                    code.getCodeNumber(),code.getUser().getUserNumber(),code.getCodeContent(),code.getCodeTitle(),code.getCodeDes(),code.getCodeDate()
            );
            result.add(dto);
        }
        return result;


    }

    public CodeSearchResponseDto getCodeByCodeNumber(String email, Long codeNumber) {
        Optional<User> user = userRepository.findByEmail(email);
        User userEntity = user.get();

        Code code = codeRepository.findByCodeNumber(codeNumber);

        CodeSearchResponseDto dto = new CodeSearchResponseDto(
                code.getCodeNumber(),code.getUser().getUserNumber(),code.getCodeContent(),code.getCodeTitle(),code.getCodeDes(),code.getCodeDate()
        );


        return dto;
    }
}
