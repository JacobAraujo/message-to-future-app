package com.jacob_araujo.message_to_future_api.service;

import com.jacob_araujo.message_to_future_api.exception.TooManyRequestsException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.time.Instant;
import java.util.ArrayDeque;
import java.util.Deque;
import java.util.Locale;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Component
public class ForgotPasswordRateLimiter {

    private final Duration window;
    private final int maxRequestsPerIp;
    private final int maxRequestsPerEmail;
    private final Map<String, Deque<Instant>> ipAttempts = new ConcurrentHashMap<>();
    private final Map<String, Deque<Instant>> emailAttempts = new ConcurrentHashMap<>();

    public ForgotPasswordRateLimiter(
            @Value("${security.forgot-password.rate-limit.window:15m}") Duration window,
            @Value("${security.forgot-password.rate-limit.ip.max-requests:10}") int maxRequestsPerIp,
            @Value("${security.forgot-password.rate-limit.email.max-requests:3}") int maxRequestsPerEmail) {
        this.window = window;
        this.maxRequestsPerIp = maxRequestsPerIp;
        this.maxRequestsPerEmail = maxRequestsPerEmail;
    }

    public synchronized void validateAndRecord(String clientIp, String username) {
        Instant now = Instant.now();
        Instant cutoff = now.minus(window);

        String normalizedClientIp = normalizeClientIp(clientIp);
        String normalizedUsername = normalizeUsername(username);

        Deque<Instant> ipHistory = ipAttempts.computeIfAbsent(normalizedClientIp, key -> new ArrayDeque<>());
        Deque<Instant> emailHistory = emailAttempts.computeIfAbsent(normalizedUsername, key -> new ArrayDeque<>());

        prune(ipHistory, cutoff);
        prune(emailHistory, cutoff);

        if (ipHistory.size() >= maxRequestsPerIp || emailHistory.size() >= maxRequestsPerEmail) {
            log.warn("Forgot-password rate limit exceeded for email={} ip={}", maskEmail(normalizedUsername), normalizedClientIp);
            throw new TooManyRequestsException("Too many password reset attempts. Try again later.");
        }

        ipHistory.addLast(now);
        emailHistory.addLast(now);
    }

    public synchronized void clear() {
        ipAttempts.clear();
        emailAttempts.clear();
    }

    private void prune(Deque<Instant> attempts, Instant cutoff) {
        while (!attempts.isEmpty() && attempts.peekFirst().isBefore(cutoff)) {
            attempts.removeFirst();
        }
    }

    private String normalizeClientIp(String clientIp) {
        if (clientIp == null || clientIp.isBlank()) {
            return "unknown";
        }
        return clientIp.trim();
    }

    private String normalizeUsername(String username) {
        if (username == null || username.isBlank()) {
            return "unknown";
        }
        return username.trim().toLowerCase(Locale.ROOT);
    }

    private String maskEmail(String username) {
        int atIndex = username.indexOf('@');
        if (atIndex <= 1) {
            return "***";
        }
        return username.charAt(0) + "***" + username.substring(atIndex);
    }
}
