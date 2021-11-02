package com.codeback.web.dto;

import lombok.Data;
import lombok.Setter;

@Data
public class LoginedUser {
    private String email;
    private String authority;

    public LoginedUser(String email, String authority){
        this.email = email;
        this.authority = authority;
    }
}
