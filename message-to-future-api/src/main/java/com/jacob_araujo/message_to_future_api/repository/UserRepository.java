package com.jacob_araujo.message_to_future_api.repository;

import com.jacob_araujo.message_to_future_api.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

}
