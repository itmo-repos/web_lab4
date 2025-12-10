package com.lab4.utils;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.List;

import javax.crypto.SecretKey;

import com.lab4.auth.SecurityConfig;

@ApplicationScoped
public class JwtService {

    @Inject
    private SecurityConfig securityConfig;

    private SecretKey key;

    public JwtService(String secret) {
    
    }

    @PostConstruct
    private void init() {
        key = Keys.hmacShaKeyFor(securityConfig.getJwtSecret().getBytes(StandardCharsets.UTF_8));
    }

    public String generateToken(String username, List<String> roles) {
        long now = System.currentTimeMillis();

        return Jwts.builder()
                .subject(username)
                .claim("roles", roles)
                .issuer("my-jjwt-auth")
                .issuedAt(new Date(now))
                .expiration(new Date(now + securityConfig.getAccessTokenDuration()))
                .signWith(key, Jwts.SIG.HS256)
                .compact();
    }

    public Jws<Claims> parseToken(String token) throws JwtException {
        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token);
    }
}
