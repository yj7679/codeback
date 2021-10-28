package com.codeback.service.user;

import com.codeback.domain.user.UserRepository;
import com.codeback.web.dto.UserSaveRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@RequiredArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;

    @Transactional
    public void save(UserSaveRequestDto userRequestDto) {
        userRepository.save(userRequestDto.toEntity());
    }
}
