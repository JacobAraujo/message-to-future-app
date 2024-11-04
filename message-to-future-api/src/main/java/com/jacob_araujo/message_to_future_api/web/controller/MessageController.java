package com.jacob_araujo.message_to_future_api.web.controller;

import com.jacob_araujo.message_to_future_api.entity.Message;
import com.jacob_araujo.message_to_future_api.entity.User;
import com.jacob_araujo.message_to_future_api.jwt.JwtUserDetails;
import com.jacob_araujo.message_to_future_api.service.MessageService;
import com.jacob_araujo.message_to_future_api.service.UserService;
import com.jacob_araujo.message_to_future_api.web.dto.MessageCreateDto;
import com.jacob_araujo.message_to_future_api.web.dto.MessageResponseDto;
import com.jacob_araujo.message_to_future_api.web.dto.UserResponseDto;
import com.jacob_araujo.message_to_future_api.web.dto.mapper.MessageMapper;
import com.jacob_araujo.message_to_future_api.web.dto.mapper.UserMapper;
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
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
                    @ApiResponse(responseCode = "412", description = "Limite de mensagens por usuário atingido",
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

    @Operation(summary = "Recuperar uma mensagem pelo id",
            responses = {
                    @ApiResponse(responseCode="200", description="Recurso recuperado com sucesso",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = UserResponseDto.class))),
                    @ApiResponse(responseCode = "404", description = "Recurso não encontrado",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorMessage.class)))
            })
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') OR ( hasRole('CLIENT') AND #id == authentication.principal.getId )")
    public ResponseEntity<MessageResponseDto> getById (@PathVariable Long id){
        Message message = messageService.searchById(id);
        return ResponseEntity.ok(MessageMapper.toDto(message));
    }

    @Operation(summary = "Recuperar uma mensagem pelo link",
            responses = {
                    @ApiResponse(responseCode="200", description="Recurso recuperado com sucesso",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = UserResponseDto.class))),
                    @ApiResponse(responseCode = "404", description = "Recurso não encontrado",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorMessage.class)))
            })
    @GetMapping("/link/{linkToken}")
    public ResponseEntity<MessageResponseDto> getByLinkToken (@PathVariable String linkToken){
        Message message = messageService.searchByLinkToken(linkToken);
        return ResponseEntity.ok(MessageMapper.toDto(message));
    }

    @Operation(summary = "Usuários recuperados com sucesso",
            responses = {
                    @ApiResponse(responseCode="200", description="Recuso recuperado com sucesso com sucesso",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = UserResponseDto[].class)))
            })
    @GetMapping()
    public ResponseEntity<List<MessageResponseDto>> getAllMessagesFromOneUser (@AuthenticationPrincipal JwtUserDetails userDetails){
        List<Message> messages = messageService.searchAllMessagesFromOneUser(userDetails.getId());
        return ResponseEntity.ok(MessageMapper.toListDto(messages));
    }
}
