package com.codeback.web.dto;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Data
public class EmailAuthConfirmDto {
    @NotBlank(message = "Email address cannot be empty")
    @Email(message = "Please provide valid email address")
    private String email;
    @NotBlank(message = "code cannot be empty")
    private String code;
}
