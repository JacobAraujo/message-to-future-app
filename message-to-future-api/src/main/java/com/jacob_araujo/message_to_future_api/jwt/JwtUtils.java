package com.jacob_araujo.message_to_future_api.jwt;

import com.jacob_araujo.message_to_future_api.config.JwtProperties;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Slf4j
@Component
public class JwtUtils {

    public static final String JWT_BEARER = "Bearer ";
    public static final String JWT_AUTHORIZATION = "Authorization";

    private final SecretKey signingKey;
    private final JwtProperties jwtProperties;

    public JwtUtils(JwtProperties jwtProperties) {
        this.jwtProperties = jwtProperties;
        this.signingKey = Keys.hmacShaKeyFor(jwtProperties.getSecret().getBytes(StandardCharsets.UTF_8));
    }

    private Date toExpireDate(Date start) {
        return Date.from(start.toInstant().plus(jwtProperties.getAccessTokenExpiration()));
    }

    public JwtToken createToken(String username, String role) {
        Date issuedAt = new Date();
        Date limit = toExpireDate(issuedAt);
        String token = Jwts.builder()
                .header().add("typ", "JWT")
                .and()
                .subject(username)
                .issuedAt(issuedAt)
                .expiration(limit)
                .signWith(signingKey)
                .claim("role", role)
                .compact();
        return new JwtToken(token);
    }

    private Claims getClaimsFromToken(String token) {
        try {
            return Jwts.parser()
                    .verifyWith(signingKey)
                    .build()
                    .parseSignedClaims(refactorToken(token))
                    .getPayload();
        } catch (JwtException ex) {
            log.error("Token invalido {}", ex.getMessage());
        }
        return null;
    }

    public String getUsernameFromToken(String token) {
        return getClaimsFromToken(token).getSubject();
    }

    public boolean isTokenValid(String token) {
        try {
            Jwts.parser()
                    .verifyWith(signingKey)
                    .build()
                    .parseSignedClaims(refactorToken(token));
            return true;
        } catch (JwtException ex) {
            log.error("Token invalido {}", ex.getMessage());
        }
        return false;
    }

    private String refactorToken(String token) {
        if (token.contains(JWT_BEARER)) {
            return token.substring(JWT_BEARER.length());
        }
        return token;
    }
}
