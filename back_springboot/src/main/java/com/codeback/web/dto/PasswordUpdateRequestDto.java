package com.codeback.web.dto;

import com.codeback.domain.user.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class PasswordUpdateRequestDto {
    private String email;
    private String password;

    @Builder
    public PasswordUpdateRequestDto(String email, String password){
        this.email = email;
        this.password = password;
    }
}
