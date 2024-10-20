package com.jacob_araujo.message_to_future_api.web.dto;

import com.jacob_araujo.message_to_future_api.entity.Message;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class MessageCreateDto {

    @NotEmpty
    @Size(max = 1000)
    private String messageText;
    @NotBlank
    @Size(max = 100)
    private String recipientName;
    @NotBlank
    @Size(max = 20)
    private String openingDateTime;
    @Size(max = 255)
    private String narrativeTheme;
}
