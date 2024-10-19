package com.jacob_araujo.message_to_future_api.web.dto;

import com.jacob_araujo.message_to_future_api.entity.Message;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class MessageCreateDto {

    @NotBlank
    @Size(max = 1000)
    private String messageText;
    @NotBlank
    @Size(max = 100)
    private String recipientName;
    @NotBlank
    @Size(max = 20)
    private String openingDateTime;
    @NotBlank
    @Size(max = 255)
    private String narrativeTheme;
}
