package com.jacob_araujo.message_to_future_api.web.exception;

import com.jacob_araujo.message_to_future_api.exception.*;
import com.jacob_araujo.message_to_future_api.jwt.JwtAuthenticationEntryPoint;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.format.DateTimeParseException;

@Slf4j
@RestControllerAdvice
public class ApiExceptionHandler {

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ErrorMessage> AccessDeniedException(AccessDeniedException ex,
                                                              HttpServletRequest request){
        log.error("Api Error -", ex);
        return ResponseEntity
                .status(HttpStatus.FORBIDDEN)
                .contentType(MediaType.APPLICATION_JSON)
                .body(new ErrorMessage(request, HttpStatus.FORBIDDEN, ex.getMessage()));

    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorMessage> methodArgumentNotValidException(MethodArgumentNotValidException ex,
                                                                        HttpServletRequest request,
                                                                        BindingResult result){
        log.error("Api Error -", ex);
        return ResponseEntity
                .status(HttpStatus.UNPROCESSABLE_ENTITY)
                .contentType(MediaType.APPLICATION_JSON)
                .body(new ErrorMessage(request, HttpStatus.UNPROCESSABLE_ENTITY, "Invalid field(s)", result));

    }

    @ExceptionHandler({UsernameUniqueViolationException.class, CpfUniqueViolationException.class, RecipientAndDataUniqueViolationException.class})
    public ResponseEntity<ErrorMessage> usernameUniqueViolationException(RuntimeException ex,
                                                                        HttpServletRequest request){
        log.error("Api Error -", ex);
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .contentType(MediaType.APPLICATION_JSON)
                .body(new ErrorMessage(request, HttpStatus.CONFLICT, ex.getMessage()));

    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<ErrorMessage> entityNotFoundException(RuntimeException ex, HttpServletRequest request){

        log.error("Api Error -", ex);
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .contentType(MediaType.APPLICATION_JSON)
                .body(new ErrorMessage(request, HttpStatus.NOT_FOUND, ex.getMessage()));

    }

    @ExceptionHandler(InvalidPasswordException.class)
    public ResponseEntity<ErrorMessage> invalidPasswordException(RuntimeException ex,
                                                                         HttpServletRequest request) {
        log.error("Api Error -", ex);
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .contentType(MediaType.APPLICATION_JSON)
                .body(new ErrorMessage(request, HttpStatus.BAD_REQUEST, ex.getMessage()));

    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ErrorMessage> handleDataIntegrityViolationException(DataIntegrityViolationException ex,
                                                                        HttpServletRequest request) {
        // Lógica para tratar a exceção
        log.error("Api Error -", ex);
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .contentType(MediaType.APPLICATION_JSON)
                .body(new ErrorMessage(request, HttpStatus.CONFLICT, "Data integrity violation"));

    }

    @ExceptionHandler(invalidTokenException.class)
    public ResponseEntity<ErrorMessage> invalidTokenException(RuntimeException ex,
                                                               HttpServletRequest request) {
        log.error("Api Error -", ex);
        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .contentType(MediaType.APPLICATION_JSON)
                .body(new ErrorMessage(request, HttpStatus.UNAUTHORIZED, ex.getMessage()));
    }

    @ExceptionHandler(UserMessageLimitExceededException.class)
    public ResponseEntity<ErrorMessage> UserMessageLimitExceededException(RuntimeException ex,
                                                              HttpServletRequest request) {
        log.error("Api Error -", ex);
        return ResponseEntity
                .status(HttpStatus.PRECONDITION_FAILED)
                .contentType(MediaType.APPLICATION_JSON)
                .body(new ErrorMessage(request, HttpStatus.PRECONDITION_FAILED, ex.getMessage()));
    }

    @ExceptionHandler(DateTimeParseException.class)
    public ResponseEntity<String> handleDateTimeParseException(DateTimeParseException ex) {
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST) // Retorna 400 Bad Request
                .body("Erro no formato de data: " + ex.getParsedString());
    }

}
