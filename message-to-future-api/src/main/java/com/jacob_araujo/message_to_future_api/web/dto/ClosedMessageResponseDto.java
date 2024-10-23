package com.jacob_araujo.message_to_future_api.web.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ClosedMessageResponseDto {
    private Long id;
    private Long senderUserId;
    private LocalDateTime openingDateTime;
    private String senderUser;
    private String narrativeTheme;
    private String recipientName;
    private LocalDateTime creationDate;
    private String statusMessage;
    private String linkToken;
}
