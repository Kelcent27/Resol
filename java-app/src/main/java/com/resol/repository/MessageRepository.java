package com.resol.repository;

import com.resol.entity.ChatMessage;
import com.resol.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<ChatMessage, Long> {
    List<ChatMessage> findByUser(User user);
}
