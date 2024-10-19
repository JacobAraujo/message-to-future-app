package com.jacob_araujo.message_to_future_api.web.controller;

import com.jacob_araujo.message_to_future_api.entity.Message;
import com.jacob_araujo.message_to_future_api.jwt.JwtUserDetails;
import com.jacob_araujo.message_to_future_api.service.MessageService;
import com.jacob_araujo.message_to_future_api.service.UserService;
import com.jacob_araujo.message_to_future_api.web.dto.MessageCreateDto;
import com.jacob_araujo.message_to_future_api.web.dto.MessageResponseDto;
import com.jacob_araujo.message_to_future_api.web.dto.mapper.MessageMapper;
import com.jacob_araujo.message_to_future_api.web.exception.ErrorMessage;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@Tag(name= "Mensagens", description = "Contém todas operações relativas aos recursos para cadastro, edição e leitura de mensagens")
@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/messages")
public class MessageController {

    private final MessageService messageService;
    private final UserService userService;

    @Operation(summary = "Criar uma nova mensagem",
            responses = {
                    @ApiResponse(responseCode="201", description="Recurso criado com sucesso",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = MessageResponseDto.class))),
                    @ApiResponse(responseCode = "409", description = "Destinatário já cadastrado no sistema com essa data",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorMessage.class))),
                    @ApiResponse(responseCode = "422", description = "Recurso não processado por dados de entrada inválidos",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorMessage.class)))
            })
    @PostMapping
    public ResponseEntity<MessageResponseDto> create (@Valid @RequestBody MessageCreateDto createDto,
                                                      @AuthenticationPrincipal JwtUserDetails userDetails){ // tem que converter o objeto dto dentro do controller, e não passar para o service porque como estamos criando o dto dentro da camada web so devemos usar o dto dentro da camada web
        Message message = MessageMapper.toMessage(createDto);
        message.setSenderUser(userService.searchById(userDetails.getId()));
        Message messageCreated = messageService.save(message);
        return ResponseEntity.status(HttpStatus.CREATED).body(MessageMapper.toDto(messageCreated));
    }
}
