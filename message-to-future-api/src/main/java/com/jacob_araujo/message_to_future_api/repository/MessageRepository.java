package com.jacob_araujo.message_to_future_api.repository;

import com.jacob_araujo.message_to_future_api.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message, Long> {
}