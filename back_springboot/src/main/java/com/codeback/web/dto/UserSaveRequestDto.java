package com.codeback.web.dto;

import com.codeback.domain.user.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter

@NoArgsConstructor
public class UserSaveRequestDto {
    private String email;
    private String nickname;
    private String password;


}
