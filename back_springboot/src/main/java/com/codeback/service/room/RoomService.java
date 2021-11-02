package com.codeback.service.room;

import com.codeback.domain.room.Room;
import com.codeback.domain.room.RoomRepository;
import com.codeback.domain.user.User;
import com.codeback.domain.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class RoomService {

    private final RoomRepository roomRepository;
    private final UserRepository userRepository;

    // 사용자 닉네임과 현재 시각으로 HASHING해서 RoomId만들어서 저장하고 return하고
    @Transactional
    public String makeRoom(String email) {

        Optional<User> user = userRepository.findByEmail(email);
        User userEntity = user.get();
        System.out.println(userEntity);
        long time = System.currentTimeMillis();

        // 초단위까지해서 유일 값 만들기
        String t = Long.toString(time);

        String roomId = email + t;
        // room table에 추가
        Room room = Room.builder()
                .user(userEntity)
                .roomId(roomId)
                .build();

        return roomRepository.save(room).getRoomId();

    }


}
