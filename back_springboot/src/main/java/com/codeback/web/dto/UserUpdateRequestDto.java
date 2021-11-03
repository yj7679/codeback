package com.codeback.web.dto;

import com.codeback.domain.user.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserUpdateRequestDto {
    private String email;
    private String nickname;
    private String password;

    @Builder
    public UserUpdateRequestDto(String email, String nickname, String password){
        this.email = email;
        this.nickname = nickname;
        this.password = password;
    }

    public  User toEntity(){
        return User.builder()
                .nickname(nickname)
                .password(password)
                .build();
    }
}
