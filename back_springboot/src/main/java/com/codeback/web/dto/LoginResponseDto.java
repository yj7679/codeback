package com.codeback.web.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * @Author: TCMALTUNKAN - MEHMET ANIL ALTUNKAN
 * @Date: 30.12.2019:09:51, Pzt
 **/
@Data @AllArgsConstructor
public class LoginResponseDto {
    private SuccessFailure status;
    private String message;

    public enum SuccessFailure {
        SUCCESS, FAILURE
    }
}