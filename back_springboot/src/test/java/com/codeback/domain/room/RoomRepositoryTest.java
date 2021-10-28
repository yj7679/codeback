//package com.codeback.domain.room;
//
//import com.codeback.domain.user.User;
//import org.junit.After;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.test.context.junit4.SpringRunner;
//import static org.assertj.core.api.Assertions.assertThat;
//
//import java.util.List;
//
//@RunWith(SpringRunner.class)
//@SpringBootTest
//public class RoomRepositoryTest {
//    @Autowired
//    RoomRepository roomRepository;
//
//    @After
//    public void cleanup(){
//        roomRepository.deleteAll();
//    }
//
//    @Test
//    public void 방정보_불러오기(){
//        User user = User.builder()
//                .email("yj_7679@naver.com")
//                .password("1234")
//                .nickName("mynickname")
//                .build();
//        String roomId = "1234";
//        roomRepository.save(Room.builder()
//                .user(user)
//                .roomId(roomId)
//                .build());
//
//        // when
//        List<Room> roomList = roomRepository.findAll();
//
//        // then
//        Room room = roomList.get(0);
//        assertThat(room.getUser().getNickName()).isEqualTo(user);
//        assertThat(room.getRoomId()).isEqualTo(roomId);
//    }
//}
