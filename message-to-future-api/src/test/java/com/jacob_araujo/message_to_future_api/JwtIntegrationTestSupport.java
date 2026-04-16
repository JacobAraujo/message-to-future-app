package com.jacob_araujo.message_to_future_api;

import com.jacob_araujo.message_to_future_api.support.TestJwtSecrets;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;

abstract class JwtIntegrationTestSupport {

    private static final String TEST_JWT_SECRET = TestJwtSecrets.generate();

    @DynamicPropertySource
    static void registerJwtProperties(DynamicPropertyRegistry registry) {
        registry.add("security.jwt.secret", () -> TEST_JWT_SECRET);
        registry.add("security.jwt.access-token-expiration", () -> "30m");
        registry.add("security.jwt.refresh-token-expiration", () -> "7d");
    }
}
