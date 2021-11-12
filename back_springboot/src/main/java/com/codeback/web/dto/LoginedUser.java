package com.codeback.web.dto;

import lombok.Data;
import lombok.Setter;

@Data
public class LoginedUser {
    private Long userNumber;
    private String authority;

    public LoginedUser(Long userNumber, String authority){
        this.userNumber = userNumber;
        this.authority = authority;
    }
}
