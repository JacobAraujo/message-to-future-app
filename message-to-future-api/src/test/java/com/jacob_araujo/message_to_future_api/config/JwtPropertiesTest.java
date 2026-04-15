package com.jacob_araujo.message_to_future_api.config;

import org.junit.jupiter.api.Test;
import org.springframework.boot.autoconfigure.AutoConfigurations;
import org.springframework.boot.autoconfigure.context.ConfigurationPropertiesAutoConfiguration;
import org.springframework.boot.autoconfigure.validation.ValidationAutoConfiguration;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.test.context.runner.ApplicationContextRunner;
import org.springframework.context.annotation.Configuration;

import static org.assertj.core.api.Assertions.assertThat;

class JwtPropertiesTest {

    private final ApplicationContextRunner contextRunner = new ApplicationContextRunner()
            .withConfiguration(AutoConfigurations.of(
                    ConfigurationPropertiesAutoConfiguration.class,
                    ValidationAutoConfiguration.class
            ))
            .withUserConfiguration(JwtPropertiesConfiguration.class);

    @Test
    void shouldFailWhenSecretIsMissing() {
        contextRunner
                .withPropertyValues(
                        "security.jwt.access-token-expiration=30m",
                        "security.jwt.refresh-token-expiration=7d"
                )
                .run(context -> {
                    assertThat(context).hasFailed();
                    assertThat(context.getStartupFailure()).hasStackTraceContaining("security.jwt.secret is required");
                });
    }

    @Test
    void shouldFailWhenSecretIsTooShort() {
        contextRunner
                .withPropertyValues(
                        "security.jwt.secret=short-secret",
                        "security.jwt.access-token-expiration=30m",
                        "security.jwt.refresh-token-expiration=7d"
                )
                .run(context -> {
                    assertThat(context).hasFailed();
                    assertThat(context.getStartupFailure()).hasStackTraceContaining("security.jwt.secret must be at least 32 bytes long");
                });
    }

    @Test
    void shouldLoadWhenJwtConfigurationIsValid() {
        contextRunner
                .withPropertyValues(
                        "security.jwt.secret=0123456789abcdef0123456789abcdef",
                        "security.jwt.access-token-expiration=30m",
                        "security.jwt.refresh-token-expiration=7d"
                )
                .run(context -> {
                    assertThat(context).hasNotFailed();
                    assertThat(context).hasSingleBean(JwtProperties.class);
                });
    }

    @Configuration(proxyBeanMethods = false)
    @EnableConfigurationProperties(JwtProperties.class)
    static class JwtPropertiesConfiguration {
    }
}
