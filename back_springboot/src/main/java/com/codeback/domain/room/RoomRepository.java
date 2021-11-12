package com.codeback.domain.room;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

public interface RoomRepository extends JpaRepository<Room, Long> {

    void deleteByUserUserNumber(long userNumber);

    Optional<Room> findByRoomId(String roomId);

    void deleteByRoomId(String roomid);
}
