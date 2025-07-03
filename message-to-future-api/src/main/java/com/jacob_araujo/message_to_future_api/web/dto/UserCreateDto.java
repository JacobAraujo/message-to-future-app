package com.jacob_araujo.message_to_future_api.web.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.Locale;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @ToString
public class UserCreateDto {

    @NotBlank
    @Email()
    private String username;

    @NotBlank
    @Pattern(
            regexp = "^(?=.*[A-Za-z])(?=.*\\d)\\S{8,30}$",
            message = "A senha deve ter 8‒30 caracteres, incluir pelo menos uma letra e um número e pode conter símbolos."
    )
    private String password;

    public void setUsername(String username) {
        this.username = username == null
                ? null
                : username.trim().toLowerCase(Locale.ROOT);
    }
}
