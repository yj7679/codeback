package com.codeback.domain.user;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Set;

/**
 * @Author: TCMALTUNKAN - MEHMET ANIL ALTUNKAN
 * @Date: 28.10.2019:11:26, Pzt
 **/
@NoArgsConstructor
@Entity
@Getter
@Table(schema = "codeback", name = "authority")
public class Authority implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long authorityId;

    @Column(length = 100, unique = true)
    @NotNull
    private String authorityName;

    @JsonIgnore
    @ToString.Exclude
    @ManyToMany(mappedBy = "authorities", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<User> users;

    public GrantedAuthority grantedAuthority() {
        return new SimpleGrantedAuthority(this.authorityName);
    }

    @Builder
    public Authority(String authorityName){
        this.authorityName=authorityName;
    }
}
