package com.jacob_araujo.message_to_future_api.config;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

import java.nio.charset.StandardCharsets;
import java.time.Duration;

@Getter
@Setter
@Validated
@ConfigurationProperties(prefix = "security.jwt")
public class JwtProperties {

    private static final int MIN_SECRET_BYTES = 32;

    @NotBlank(message = "security.jwt.secret is required")
    private String secret;

    @NotNull(message = "security.jwt.access-token-expiration is required")
    private Duration accessTokenExpiration;

    @NotNull(message = "security.jwt.refresh-token-expiration is required")
    private Duration refreshTokenExpiration;

    @AssertTrue(message = "security.jwt.secret must be at least 32 bytes long")
    public boolean isSecretLengthValid() {
        return secret != null && secret.getBytes(StandardCharsets.UTF_8).length >= MIN_SECRET_BYTES;
    }

    @AssertTrue(message = "security.jwt.access-token-expiration must be greater than zero")
    public boolean isAccessTokenExpirationValid() {
        return accessTokenExpiration != null && accessTokenExpiration.isPositive();
    }

    @AssertTrue(message = "security.jwt.refresh-token-expiration must be greater than zero")
    public boolean isRefreshTokenExpirationValid() {
        return refreshTokenExpiration != null && refreshTokenExpiration.isPositive();
    }
}
