package com.jacob_araujo.message_to_future_api.web.dto;

import com.jacob_araujo.message_to_future_api.entity.Message;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class MessageResponseDto {

    private Long id;
    private Long senderUserId;
    private String messageText;
    private String openingDateTime;
    private String senderUser;
    private String narrativeTheme;
    private String recipientName;
    private LocalDateTime creationDate;
    private String status;
}
