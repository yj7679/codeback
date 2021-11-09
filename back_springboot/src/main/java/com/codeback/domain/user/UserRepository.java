package com.codeback.domain.user;

import com.codeback.domain.code.Code;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByNickname(String nickname);

    Optional<User> findByEmail(String email);

    @EntityGraph(attributePaths = "authorities") //-> EAGER조회로 authorities 정보 같이 가져옴
    Optional<User> findOneWithAuthoritiesByEmail(String email);

    int deleteByEmail(String email);
}
