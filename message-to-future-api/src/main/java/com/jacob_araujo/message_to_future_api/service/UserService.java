package com.jacob_araujo.message_to_future_api.service;

import com.jacob_araujo.message_to_future_api.entity.User;
import com.jacob_araujo.message_to_future_api.exception.EntityNotFoundException;
import com.jacob_araujo.message_to_future_api.exception.InvalidPasswordException;
import com.jacob_araujo.message_to_future_api.exception.UsernameUniqueViolationException;
import com.jacob_araujo.message_to_future_api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Slf4j
@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JavaMailSender mailSender;
    private final ForgotPasswordRateLimiter forgotPasswordRateLimiter;

    @Value("${security.forgot-password.minimum-response-time:250ms}")
    private Duration forgotPasswordMinimumResponseTime;

    @Transactional
    public User save(User user) {
        try{
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            User userSaved = userRepository.save(user);

            String tokenEmailVerification = UUID.randomUUID().toString();
            user.setTokenEmailVerification(tokenEmailVerification);

            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(userSaved.getUsername());
            message.setSubject("Verify your email"); // TODO ver como vai ficar o idioma da mensagem
            message.setText("Click on the link to verify your email: https://message-to-future.site/verification-email/" + tokenEmailVerification);
            mailSender.send(message);

            return userSaved;

        } catch (org.springframework.dao.DataIntegrityViolationException ex) {
            throw new UsernameUniqueViolationException(String.format("Username %s already exists", user.getUsername()));
        }
    }

    @Transactional(readOnly = true)
    public User searchById(Long id) {
        return userRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException(String.format("User id=%s not found.", id))
        );
    }

    @Transactional
    public User updatePassword(Long id, String currentPassword, String newPassword, String confirmPassword) {
        if (!newPassword.equals(confirmPassword)){
            throw new InvalidPasswordException("New password is not the same of confirm password.");
        }
        User user = searchById(id);
        if (!passwordEncoder.matches(currentPassword, user.getPassword())){
            throw new InvalidPasswordException("Password is wrong.");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        return user;
    }

    @Transactional(readOnly = true)
    public List<User> searchAll() {
        return userRepository.findAll();
    }

    public User searchByUsername(String username) {
        return userRepository.findByUsername(username).orElseThrow(
                () -> new EntityNotFoundException(String.format("User username=%s not found.", username))
        );
    }

    public User.Role searchRoleByUsername(String username) {
        return searchByUsername(username).getRole(); // diferente -> ver se funciona
    }

    @Transactional
    public User verifyEmail(String token) {
        User user = userRepository.findByTokenEmailVerification(token).orElseThrow(
                () -> new EntityNotFoundException(String.format("User tokenEmailVerification=%s not found.", token))
        );
        user.setEmailVerificationStatus(User.EmailVerificationStatus.VERIFIED);
        return user;
    }

    public String generateAndSavePasswordResetToken(User user) {
        String token = UUID.randomUUID().toString();
        user.setResetToken(token);
        user.setTokenExpiration(LocalDateTime.now().plusMinutes(30));
        userRepository.save(user);
        return token;
    }

    public void forgotPassword(String username, String clientIp) {
        String normalizedUsername = normalizeUsername(username);
        String normalizedClientIp = normalizeClientIp(clientIp);

        forgotPasswordRateLimiter.validateAndRecord(normalizedClientIp, normalizedUsername);

        long startedAt = System.nanoTime();
        try {
            Optional<User> user = userRepository.findByUsername(normalizedUsername);

            if (user.isPresent()) {
                try {
                    sendPasswordResetEmail(user.get());
                    log.info("Forgot-password processed for email={} ip={}", maskEmail(normalizedUsername), normalizedClientIp);
                } catch (Exception ex) {
                    log.error("Forgot-password processing failed for email={} ip={}", maskEmail(normalizedUsername), normalizedClientIp, ex);
                }
            } else {
                log.info("Forgot-password requested for unknown email={} ip={}", maskEmail(normalizedUsername), normalizedClientIp);
            }
        } finally {
            ensureMinimumProcessingTime(startedAt);
        }
    }

    @Transactional
    public void resetPassword(String resetToken, String newPassword, String confirmPassword) {
        User user = userRepository.findByResetToken(resetToken).orElseThrow(
                () -> new EntityNotFoundException(String.format("User resetToken=%s not found.", resetToken))
        );

        if (!newPassword.equals(confirmPassword)){
            throw new InvalidPasswordException("New password is not the same of confirm password.");
        }

        if (user != null && user.getTokenExpiration().isAfter(LocalDateTime.now())) {
            user.setPassword(passwordEncoder.encode(newPassword));
            user.setResetToken(null);
            user.setTokenExpiration(null);
        }
    }

    private void sendPasswordResetEmail(User user) {
        String token = generateAndSavePasswordResetToken(user);

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(user.getUsername());
        message.setSubject("Password Reset Request");
        message.setText("Link to reset your password:\n" +
                "\n" +
                "https://message-to-future.site/reset-password/" + token + "\n" +
                "\n" +
                "This link is valid for 30 minutes. If you did not request this, please ignore this email.");

        mailSender.send(message);
    }

    private void ensureMinimumProcessingTime(long startedAt) {
        long elapsedNanos = System.nanoTime() - startedAt;
        long minimumNanos = forgotPasswordMinimumResponseTime.toNanos();
        long remainingNanos = minimumNanos - elapsedNanos;

        if (remainingNanos <= 0) {
            return;
        }

        try {
            TimeUnit.NANOSECONDS.sleep(remainingNanos);
        } catch (InterruptedException ex) {
            Thread.currentThread().interrupt();
            log.warn("Forgot-password delay interrupted");
        }
    }

    private String normalizeUsername(String username) {
        if (username == null) {
            return "";
        }
        return username.trim().toLowerCase(Locale.ROOT);
    }

    private String normalizeClientIp(String clientIp) {
        if (clientIp == null || clientIp.isBlank()) {
            return "unknown";
        }
        return clientIp.trim();
    }

    private String maskEmail(String username) {
        int atIndex = username.indexOf('@');
        if (atIndex <= 1) {
            return "***";
        }
        return username.charAt(0) + "***" + username.substring(atIndex);
    }
}
