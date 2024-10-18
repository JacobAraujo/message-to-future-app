package com.jacob_araujo.message_to_future_api.repository;

import com.jacob_araujo.message_to_future_api.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}
