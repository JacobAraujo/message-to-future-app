package com.jacob_araujo.message_to_future_api.service;

import com.jacob_araujo.message_to_future_api.entity.Message;
import com.jacob_araujo.message_to_future_api.entity.User;
import com.jacob_araujo.message_to_future_api.exception.EntityNotFoundException;
import com.jacob_araujo.message_to_future_api.exception.RecipientAndDataUniqueViolationException;
import com.jacob_araujo.message_to_future_api.exception.UserMessageLimitExceededException;
import com.jacob_araujo.message_to_future_api.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class MessageService {

    private final MessageRepository messageRepository;
    private final UserService userService;

    private static final int MAX_MESSAGES_PER_USER = 5;

    @Transactional
    public Message save(Message message) {
        if (searchAllMessagesFromOneUser(message.getSenderUser().getId()).size() >= MAX_MESSAGES_PER_USER){
            throw new UserMessageLimitExceededException(String.format("User %s has reached the limit of %s messages", message.getSenderUser().getUsername(), MAX_MESSAGES_PER_USER));
        }

        String linkToken = UUID.randomUUID().toString(); // TODO talvez mudar a forma como é gerado o link
        message.setLinkToken(linkToken);
        try{
            User user = userService.searchById(message.getSenderUser().getId());
            user.setAvailableMessageLimit(user.getAvailableMessageLimit() - 1);
            return messageRepository.save(message);
        } catch (org.springframework.dao.DataIntegrityViolationException ex) {
            throw new RecipientAndDataUniqueViolationException(String.format("Recipient %s already exists with this data", message.getRecipientName()));
        }
    }

    @Transactional(readOnly = true)
    public Message searchById(Long id) {
        return messageRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException(String.format("Message id=%s not found.", id))
        );
    }

    public List<Message> searchAllMessagesFromOneUser(Long userId) {
        return messageRepository.findBySenderUserId(userId);
    }

    public Message searchByLinkToken(String linkToken) {
        Message message = messageRepository.findByLinkToken(linkToken).orElseThrow(
                () -> new EntityNotFoundException(String.format("Message linkToken=%s not found.", linkToken))
        );
        if (message.getOpeningDateTime().isAfter(java.time.LocalDateTime.now())){
            message.setMessageText(null);
        }
        return message;
    }

    public Message delete(Long id) {
        Message message = searchById(id);
        User user = userService.searchById(message.getSenderUser().getId());
        user.setAvailableMessageLimit(user.getAvailableMessageLimit() + 1);
        messageRepository.delete(message);
        if (message.getOpeningDateTime().isAfter(java.time.LocalDateTime.now())){
            message.setMessageText(null);
        }
        return message;
    }
}
