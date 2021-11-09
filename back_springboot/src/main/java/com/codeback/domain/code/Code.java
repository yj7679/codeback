package com.codeback.domain.code;

import com.codeback.domain.user.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.Date;

@Getter
@Entity
@NoArgsConstructor
@Table(name = "Code")
public class Code {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "code_number")
    private long codeNumber;

    @ManyToOne
    @JoinColumn(name = "user_number")
    private User user;

    @NotBlank
    @Column
    private String codeContent;

    @NotBlank
    @Column
    private String codeTitle;

    @NotBlank
    @Column
    private String codeDes;

    //아래는 코드저장날짜인데 에러나서 일단 무시하고 개발중
    @Column
    private LocalDateTime codeDate;


    @Builder
    public Code(User user, String codeContent,LocalDateTime codeDate,String codeTitle,String codeDes){
        this.user = user;
        this.codeContent = codeContent;
        this.codeTitle = codeTitle;
        this.codeDes = codeDes;
        this.codeDate = codeDate;
    }
}
