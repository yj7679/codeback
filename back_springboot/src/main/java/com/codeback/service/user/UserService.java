package com.codeback.service.user;

import com.codeback.domain.jwt.JwtFilter;
import com.codeback.domain.jwt.TokenProvider;
import com.codeback.domain.user.Authority;
import com.codeback.domain.user.User;
import com.codeback.domain.user.UserRepository;
import com.codeback.util.CookieUtil;
import com.codeback.web.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import javax.websocket.EncodeException;
import java.util.Collections;
import java.util.Optional;


@Service
public class UserService  {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TokenProvider tokenProvider;
    @Autowired
    private CookieUtil cookieUtil;
    @Autowired
    private final PasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationManagerBuilder authenticationManagerBuilder;

    public UserService(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    public void save(UserSaveRequestDto userRequestDto) {
        Authority authority = Authority.builder().authorityName("ROLE_USER").build();
        User user = User.builder().nickname(userRequestDto.getNickname())
                .password(passwordEncoder.encode(userRequestDto.getPassword()))
                .email(userRequestDto.getEmail())
                .authorities(Collections.singleton(authority))
                .build();

        userRepository.save(user);
    }
    @Transactional
    public void save(UserUpdateRequestDto userUpdateRequestDto) {
        //Transactional 을 달면 업데이트 이후에 save 안해도 영속성이 끝나는 시점에서 자동 저장됨
        Optional<User> user = findUserByEmail(userUpdateRequestDto.getEmail());

        user.ifPresent(selectUser -> {
            selectUser.setNickname((userUpdateRequestDto.getNickname()));
            selectUser.setPassword(passwordEncoder.encode(userUpdateRequestDto.getPassword()));

            //userRepository.save(selectUser); transactional로 그냥 저장됨
        });
    }
    @Transactional
    public void save(Long userNumber, UserUpdateRequestDto userUpdateRequestDto) {
        Optional<User> user = userRepository.findById(userNumber);

        user.ifPresent(selectUser -> {
            selectUser.setNickname((userUpdateRequestDto.getNickname()));
            selectUser.setEmail((userUpdateRequestDto.getEmail()));
            selectUser.setPassword(passwordEncoder.encode(userUpdateRequestDto.getPassword()));

            //userRepository.save(selectUser); transactional로 그냥 저장됨
        });
    }


    @Transactional
    public void updatePassword(PasswordUpdateRequestDto passwordUpdateRequestDto) {
        Optional<User> user = findUserByEmail(passwordUpdateRequestDto.getEmail());

        user.ifPresent(selectUser -> {
            selectUser.setPassword(passwordEncoder.encode(passwordUpdateRequestDto.getPassword()));
            //userRepository.save(selectUser);
        });
    }


    public Optional<User> findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    public Optional<User> findUserByNickname(String nickname) {
        return userRepository.findByNickname(nickname);
    }




    public UserSummary getUserProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();

        User user = userRepository.findByEmail(customUserDetails.getUsername()).orElseThrow(() -> new IllegalArgumentException("User not found with email " + customUserDetails.getUsername()));
        return user.toUserSummary();
    }

    public void addAccessTokenCookie(HttpHeaders httpHeaders, TokenDto token) {
        httpHeaders.add(HttpHeaders.SET_COOKIE, cookieUtil.createAccessTokenCookie(token.getTokenValue(), token.getDuration()).toString());
    }

    public void addRefreshTokenCookie(HttpHeaders httpHeaders, TokenDto token) {
        httpHeaders.add(HttpHeaders.SET_COOKIE, cookieUtil.createRefreshTokenCookie(token.getTokenValue(), token.getDuration()).toString());
    }

    public ResponseEntity<?> addSignUpCookie() {
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.add(HttpHeaders.SET_COOKIE, cookieUtil.createSignUpCookie().toString());

        return ResponseEntity.ok().headers(responseHeaders).body("SUCCESS");
    }

    public ResponseEntity<?> addEmailCookie() {
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.add(HttpHeaders.SET_COOKIE, cookieUtil.createEmailCookie().toString());

        return ResponseEntity.ok().headers(responseHeaders).body("eMail SUCCESS");
    }


    public Optional<User> findById(long userNumber) {
        return userRepository.findById(userNumber);
    }

    public void deleteById(long userNumber) {
        userRepository.deleteById(userNumber);
    }
}
