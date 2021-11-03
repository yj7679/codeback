package com.codeback.domain.room;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface RoomRepository extends JpaRepository<Room, Long> {

    void deleteByUserUserNumber(long userNumber);
}
