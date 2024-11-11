package com.jacob_araujo.message_to_future_api;

import com.jacob_araujo.message_to_future_api.web.dto.MessageCreateDto;
import com.jacob_araujo.message_to_future_api.web.dto.MessageResponseDto;
import com.jacob_araujo.message_to_future_api.web.exception.ErrorMessage;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.reactive.server.WebTestClient;

import java.time.LocalDateTime;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Sql(scripts = "/sql/messages/messages-insert.sql", executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
@Sql(scripts = "/sql/messages/messages-delete.sql", executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
public class MessageIT {

    @Autowired
    WebTestClient testClient;

    @Test
    public void createMessage_validData_returnMessageCreated201(){
        MessageResponseDto responseBody = testClient
                .post()
                .uri("/api/v1/messages")
                .headers(JwtAuthentication.getHeaderAuthorization(testClient, "ana@email.com", "123456"))
                .bodyValue(new MessageCreateDto("Oi", "Bob", "16/06/2025 14:00:00", "Rocket"))
                .exchange()
                .expectStatus().isCreated()
                .expectBody(MessageResponseDto.class)
                .returnResult()
                .getResponseBody();

        org.assertj.core.api.Assertions.assertThat(responseBody).isNotNull();
        org.assertj.core.api.Assertions.assertThat(responseBody.getMessageText()).isEqualTo("Oi");
        org.assertj.core.api.Assertions.assertThat(responseBody.getRecipientName()).isEqualTo("Bob");
        org.assertj.core.api.Assertions.assertThat(responseBody.getNarrativeTheme()).isEqualTo("Rocket");
        org.assertj.core.api.Assertions.assertThat(responseBody.getOpeningDateTime()).isEqualTo(LocalDateTime.of(2025, 6, 16, 14, 0, 0));
        org.assertj.core.api.Assertions.assertThat(responseBody.getSenderUser()).isEqualTo("ana@email.com");
        org.assertj.core.api.Assertions.assertThat(responseBody.getStatusMessage()).isEqualTo("PENDING");

    }

    @Test
    public void createMessage_recipientAndDateAlreadyRegistered_returnErrorMessage409(){
        ErrorMessage responseBody = testClient
                .post()
                .uri("/api/v1/messages")
                .headers(JwtAuthentication.getHeaderAuthorization(testClient, "ana@email.com", "123456"))
                .bodyValue(new MessageCreateDto("Oi", "Bob", "10/10/2025 10:00:00", "Rocket"))
                .exchange()
                .expectStatus().isEqualTo(409)
                .expectBody(ErrorMessage.class)
                .returnResult()
                .getResponseBody();

        org.assertj.core.api.Assertions.assertThat(responseBody).isNotNull();
        org.assertj.core.api.Assertions.assertThat(responseBody.getStatus()).isEqualTo(409);
    }

    @Test
    public void createMessage_messageLimitReached_returnErrorMessage412(){
        ErrorMessage responseBody = testClient
                .post()
                .uri("/api/v1/messages")
                .headers(JwtAuthentication.getHeaderAuthorization(testClient, "bia@email.com", "123456"))
                .bodyValue(new MessageCreateDto("Oi", "Carlos", "10/10/2025 10:00:00", "Rocket"))
                .exchange()
                .expectStatus().isEqualTo(412)
                .expectBody(ErrorMessage.class)
                .returnResult()
                .getResponseBody();

        org.assertj.core.api.Assertions.assertThat(responseBody).isNotNull();
        org.assertj.core.api.Assertions.assertThat(responseBody.getStatus()).isEqualTo(412);
    }

    @Test
    public void createMessage_invalidData_returnErrorMessage422(){
        ErrorMessage responseBody = testClient
                .post()
                .uri("/api/v1/messages")
                .headers(JwtAuthentication.getHeaderAuthorization(testClient, "ana@email.com", "123456"))
                .bodyValue(new MessageCreateDto("Oi", "", "10/10/2025 10:00:00", "Rocket"))
                .exchange()
                .expectStatus().isEqualTo(422)
                .expectBody(ErrorMessage.class)
                .returnResult()
                .getResponseBody();

        org.assertj.core.api.Assertions.assertThat(responseBody).isNotNull();
        org.assertj.core.api.Assertions.assertThat(responseBody.getStatus()).isEqualTo(422);

        responseBody = testClient
                .post()
                .uri("/api/v1/messages")
                .headers(JwtAuthentication.getHeaderAuthorization(testClient, "ana@email.com", "123456"))
                .bodyValue(new MessageCreateDto("Oi", "Bob", "", "Rocket"))
                .exchange()
                .expectStatus().isEqualTo(422)
                .expectBody(ErrorMessage.class)
                .returnResult()
                .getResponseBody();

        org.assertj.core.api.Assertions.assertThat(responseBody).isNotNull();
        org.assertj.core.api.Assertions.assertThat(responseBody.getStatus()).isEqualTo(422);

        responseBody = testClient
                .post()
                .uri("/api/v1/messages")
                .headers(JwtAuthentication.getHeaderAuthorization(testClient, "ana@email.com", "123456"))
                .bodyValue(new MessageCreateDto("", "Bob", "", "Rocket"))
                .exchange()
                .expectStatus().isEqualTo(422)
                .expectBody(ErrorMessage.class)
                .returnResult()
                .getResponseBody();

        org.assertj.core.api.Assertions.assertThat(responseBody).isNotNull();
        org.assertj.core.api.Assertions.assertThat(responseBody.getStatus()).isEqualTo(422);
    }

    @Test
    public void getMessageById_validIdAdmin_returnMessage200() {
        MessageResponseDto responseBody = testClient
                .get()
                .uri("/api/v1/messages/100")
                .headers(JwtAuthentication.getHeaderAuthorization(testClient, "ana@email.com", "123456"))
                .exchange()
                .expectStatus().isOk()
                .expectBody(MessageResponseDto.class)
                .returnResult()
                .getResponseBody();
        org.assertj.core.api.Assertions.assertThat(responseBody).isNotNull();
        org.assertj.core.api.Assertions.assertThat(responseBody.getRecipientName()).isEqualTo("Bob");
        org.assertj.core.api.Assertions.assertThat(responseBody.getNarrativeTheme()).isEqualTo("Geral");
    }

    @Test
    public void getMessageById_validIdClient_returnMessage200() {
        MessageResponseDto responseBody = testClient
                .get()
                .uri("/api/v1/messages/101")
                .headers(JwtAuthentication.getHeaderAuthorization(testClient, "bia@email.com", "123456"))
                .exchange()
                .expectStatus().isOk()
                .expectBody(MessageResponseDto.class)
                .returnResult()
                .getResponseBody();
        org.assertj.core.api.Assertions.assertThat(responseBody).isNotNull();
        org.assertj.core.api.Assertions.assertThat(responseBody.getRecipientName()).isEqualTo("Bob");
        org.assertj.core.api.Assertions.assertThat(responseBody.getNarrativeTheme()).isEqualTo("Geral");
    }

    @Test
    public void getMessageById_invalidIdAdmin_returnErrorMessage404() {
        ErrorMessage responseBody = testClient
                .get()
                .uri("/api/v1/messages/0")
                .headers(JwtAuthentication.getHeaderAuthorization(testClient, "ana@email.com", "123456"))
                .exchange()
                .expectStatus().isNotFound()
                .expectBody(ErrorMessage.class)
                .returnResult()
                .getResponseBody();
        org.assertj.core.api.Assertions.assertThat(responseBody).isNotNull();
        org.assertj.core.api.Assertions.assertThat(responseBody.getStatus()).isEqualTo(404);
    }

    @Test
    public void getMessageById_clientSearchingMessageFromOtherUser_returnErrorMessage403() {
        ErrorMessage responseBody = testClient
                .get()
                .uri("/api/v1/messages/106")
                .headers(JwtAuthentication.getHeaderAuthorization(testClient, "bia@email.com", "123456"))
                .exchange()
                .expectStatus().isForbidden()
                .expectBody(ErrorMessage.class)
                .returnResult()
                .getResponseBody();
        org.assertj.core.api.Assertions.assertThat(responseBody).isNotNull();
        org.assertj.core.api.Assertions.assertThat(responseBody.getStatus()).isEqualTo(403);
    }

    @Test
    public void deleteById_validIdAdmin_returnMessage200() {
        MessageResponseDto responseBody = testClient
                .delete()
                .uri("/api/v1/messages/100")
                .headers(JwtAuthentication.getHeaderAuthorization(testClient, "ana@email.com", "123456"))
                .exchange()
                .expectStatus().isOk()
                .expectBody(MessageResponseDto.class)
                .returnResult()
                .getResponseBody();
        org.assertj.core.api.Assertions.assertThat(responseBody).isNotNull();
        org.assertj.core.api.Assertions.assertThat(responseBody.getRecipientName()).isEqualTo("Bob");
        org.assertj.core.api.Assertions.assertThat(responseBody.getNarrativeTheme()).isEqualTo("Geral");
    }

    @Test
    public void deleteById_validIdClient_returnMessage200() {
        MessageResponseDto responseBody = testClient
                .delete()
                .uri("/api/v1/messages/101")
                .headers(JwtAuthentication.getHeaderAuthorization(testClient, "bia@email.com", "123456"))
                .exchange()
                .expectStatus().isOk()
                .expectBody(MessageResponseDto.class)
                .returnResult()
                .getResponseBody();
        org.assertj.core.api.Assertions.assertThat(responseBody).isNotNull();
        org.assertj.core.api.Assertions.assertThat(responseBody.getRecipientName()).isEqualTo("Bob");
        org.assertj.core.api.Assertions.assertThat(responseBody.getNarrativeTheme()).isEqualTo("Geral");
    }

    @Test
    public void deleteById_invalidIdAdmin_returnErrorMessage404() {
        ErrorMessage responseBody = testClient
                .delete()
                .uri("/api/v1/messages/0")
                .headers(JwtAuthentication.getHeaderAuthorization(testClient, "ana@email.com", "123456"))
                .exchange()
                .expectStatus().isNotFound()
                .expectBody(ErrorMessage.class)
                .returnResult()
                .getResponseBody();
        org.assertj.core.api.Assertions.assertThat(responseBody).isNotNull();
        org.assertj.core.api.Assertions.assertThat(responseBody.getStatus()).isEqualTo(404);
    }

    @Test
    public void deleteById_clientDeletingMessageFromOtherUser_returnErrorMessage403() {
        ErrorMessage responseBody = testClient
                .delete()
                .uri("/api/v1/messages/106")
                .headers(JwtAuthentication.getHeaderAuthorization(testClient, "bia@email.com", "123456"))
                .exchange()
                .expectStatus().isForbidden()
                .expectBody(ErrorMessage.class)
                .returnResult()
                .getResponseBody();
        org.assertj.core.api.Assertions.assertThat(responseBody).isNotNull();
        org.assertj.core.api.Assertions.assertThat(responseBody.getStatus()).isEqualTo(403);
    }

    @Test
    public void getByLinkToken_validLinkToken_returnMessage200(){
        MessageResponseDto responseBody = testClient
                .get()
                .uri("/api/v1/messages/link/a4f8c1d2-5b6e-4a7f-9b8c-0d1e2f3a4b5c")
                .exchange()
                .expectStatus().isOk()
                .expectBody(MessageResponseDto.class)
                .returnResult()
                .getResponseBody();

        org.assertj.core.api.Assertions.assertThat(responseBody).isNotNull();
        org.assertj.core.api.Assertions.assertThat(responseBody.getMessageText()).isEqualTo(null);
        org.assertj.core.api.Assertions.assertThat(responseBody.getRecipientName()).isEqualTo("Bob");
        org.assertj.core.api.Assertions.assertThat(responseBody.getNarrativeTheme()).isEqualTo("Geral");
        org.assertj.core.api.Assertions.assertThat(responseBody.getOpeningDateTime()).isEqualTo(LocalDateTime.of(2025, 10, 10, 10, 0, 0));
        org.assertj.core.api.Assertions.assertThat(responseBody.getSenderUser()).isEqualTo("ana@email.com");
        org.assertj.core.api.Assertions.assertThat(responseBody.getStatusMessage()).isEqualTo("PENDING");
    }

}
