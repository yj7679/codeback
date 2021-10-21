package com.codeback.domain.user;

import com.codeback.domain.room.Room;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;


@Entity
@NoArgsConstructor
@Table(name = "User")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long userNumber;

    @Column(unique = true) // @NotNull : null만 허용하지않음, @NotBlank : null, "", " " 전부 다 허용 x
    @NotBlank
    private String email;

    @NotBlank
    private String password;

    @NotBlank
    private String nickName;

}
