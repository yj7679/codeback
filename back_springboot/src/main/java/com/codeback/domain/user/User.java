package com.codeback.domain.user;

import com.codeback.domain.room.Room;
import com.codeback.web.dto.UserSummary;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Set;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_number")
    private long userNumber;

    @Column(unique = true) // @NotNull : null만 허용하지않음, @NotBlank : null, "", " " 전부 다 허용 x
    @NotBlank
    private String email;

    @NotBlank
    private String password;

    @NotBlank
    private String nickname;

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(
            name = "user_authority",
            joinColumns = {@JoinColumn(name = "user_number", referencedColumnName = "user_number")},
            inverseJoinColumns = {@JoinColumn(name = "authorityId", referencedColumnName = "authorityId")})
    private Set<Authority> authorities;
    @Builder
    public User(String email, String password, String nickname,Set<Authority> authorities){
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.authorities = authorities;
    }
    public UserSummary toUserSummary() {
        UserSummary userSummary = new UserSummary();
        userSummary.setEmail(this.email);
        userSummary.setNickname(this.nickname);
        return userSummary;
    }
}
