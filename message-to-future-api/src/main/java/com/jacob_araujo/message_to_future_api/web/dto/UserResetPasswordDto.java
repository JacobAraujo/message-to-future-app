package com.jacob_araujo.message_to_future_api.web.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserResetPasswordDto {

    private String resetToken;
    @NotBlank
    @Size(min = 8, max = 30)
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8}$")
    private String newPassword;
    @NotBlank
    @Size(min = 8, max = 30)
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8}$")
    private String confirmPassword;
}

