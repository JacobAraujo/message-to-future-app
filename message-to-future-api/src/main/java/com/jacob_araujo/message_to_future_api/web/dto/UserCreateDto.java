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
    @Size(min = 8, max = 30)
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8}$")
    private String password;

    public void setUsername(String username) {
        this.username = username == null
                ? null
                : username.trim().toLowerCase(Locale.ROOT);
    }
}
