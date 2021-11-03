package com.codeback.domain.room;

import com.codeback.domain.user.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Getter
@Entity
@NoArgsConstructor
@Table(name = "Room")
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "room_number")
    private long roomNumber;

    // 1:1 단방향 //
    @OneToOne
    @JoinColumn(name="user_number")
    private User user;

    @NotBlank
    @Column
    private String roomId;

    @Builder
    public Room(User user, String roomId){
        this.user = user;
        this.roomId = roomId;
    }
}
