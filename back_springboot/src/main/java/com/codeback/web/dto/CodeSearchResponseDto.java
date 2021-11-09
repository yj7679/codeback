package com.codeback.web.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Date;

/**
 * @Author: TCMALTUNKAN - MEHMET ANIL ALTUNKAN
 * @Date: 30.12.2019:09:51, Pzt
 **/
@Data @AllArgsConstructor
public class CodeSearchResponseDto {
    private Long codeNumber;
    private Long userNumber;
    private String codeContent;
    private String codeTitle;
    private String codeDes;
    private LocalDateTime codeDate;



}