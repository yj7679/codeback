package com.codeback.web.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class RoomSaveRequestDto {
    private String nickname;

    @Builder
    RoomSaveRequestDto(String nickname){
        this.nickname = nickname;
    }

}
