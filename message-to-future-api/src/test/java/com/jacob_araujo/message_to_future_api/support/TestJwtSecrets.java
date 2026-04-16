package com.jacob_araujo.message_to_future_api.support;

import java.security.SecureRandom;
import java.util.Base64;

public final class TestJwtSecrets {

    private static final SecureRandom SECURE_RANDOM = new SecureRandom();
    private static final int SECRET_SIZE_BYTES = 32;

    private TestJwtSecrets() {
    }

    public static String generate() {
        byte[] secret = new byte[SECRET_SIZE_BYTES];
        SECURE_RANDOM.nextBytes(secret);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(secret);
    }
}
