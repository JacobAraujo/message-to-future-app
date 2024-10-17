package com.jacob_araujo.message_to_future_api.web.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserResponseDto {

    private Long id;
    private String username;
    private String role;
}