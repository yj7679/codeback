package com.codeback.domain.room;

import com.codeback.domain.user.User;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
@NoArgsConstructor
@Table(name = "Room")
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long roomNumber;

    // 1:1 단방향
    @OneToOne
    @JoinColumn(name="userNumber")
    private User user;

    @NotBlank
    private String url;
}
