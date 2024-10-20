package com.jacob_araujo.message_to_future_api.repository;

import com.jacob_araujo.message_to_future_api.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findBySenderUserId(Long userId);
}