package com.codeback.web.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class EmailAuthConfirmDto {
    @NotBlank(message = "code cannot be empty")
    private String code;
}
