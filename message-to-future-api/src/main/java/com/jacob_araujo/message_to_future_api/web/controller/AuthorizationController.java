package com.jacob_araujo.message_to_future_api.web.controller;

import com.jacob_araujo.message_to_future_api.jwt.JwtToken;
import com.jacob_araujo.message_to_future_api.jwt.JwtUserDetailsService;
import com.jacob_araujo.message_to_future_api.web.dto.UserLoginDto;
import com.jacob_araujo.message_to_future_api.web.exception.ErrorMessage;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1")
public class AuthorizationController {

    private final JwtUserDetailsService detailsService;
    private final AuthenticationManager authenticationManager;

    @PostMapping("/auth")
    public ResponseEntity<?> authenticate(@RequestBody @Valid UserLoginDto dto, HttpServletRequest request) {
        log.info("Processo de autenticação pelo login {}", dto.getUsername());

        try{
            UsernamePasswordAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(dto.getUsername(), dto.getPassword());
            authenticationManager.authenticate(authenticationToken);
            JwtToken token = detailsService.getTokenAuthenticated(dto.getUsername());
            return ResponseEntity.ok(token);
        } catch (AuthenticationException ex) {
            log.warn("Bad credentials from username '{}'", dto.getUsername());
        }

        return ResponseEntity
                .badRequest()
                .body(new ErrorMessage(request, HttpStatus.BAD_REQUEST, "Invalid credentials"));
    }
}

