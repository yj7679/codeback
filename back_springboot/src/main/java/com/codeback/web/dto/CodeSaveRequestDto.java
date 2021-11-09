package com.codeback.web.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@Getter
@NoArgsConstructor
public class CodeSaveRequestDto {
    private String codeContent;
    private String codeTitle;
    private String codeDes;

}
