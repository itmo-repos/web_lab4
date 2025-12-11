package com.lab4.bean;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.time.Instant;
import java.util.List;


import com.lab4.auth.SecurityConfig;
import com.lab4.db.interfaces.UserDAOLocal;
import com.lab4.db.interfaces.RefreshTokenDAOLocal;
import com.lab4.dto.TokenResponse;
import com.lab4.entity.RefreshTokenEntity;
import com.lab4.entity.UserEntity;
import com.lab4.utils.HashGenerator;
import com.lab4.utils.JwtService;
import com.lab4.utils.SaltGenerator;

@ApplicationScoped
public class AuthService {

    @Inject
    private UserDAOLocal userDAO;

    @Inject
    private HashGenerator hashGenerator;

    @Inject
    private JwtService jwtService;

    @Inject
    private SecurityConfig securityConfig;

    @Inject
    private RefreshTokenDAOLocal refreshTokenDAO;

    public UserEntity register(String username, String password) throws Exception {
        if (userDAO.findByUsername(username) != null) {
            throw new RuntimeException("User already exists");
        }

        String salt = SaltGenerator.generateSalt();

        String passwordHash = hashGenerator.hashPassword(password, salt);

        UserEntity user = UserEntity.builder()
                .username(username)
                .salt(salt)
                .passwordHash(passwordHash)
                .build();

        userDAO.save(user);
        return user;
    }


    private boolean verifyPassword(String password, UserEntity user) throws Exception {
        String computedHash = hashGenerator.hashPassword(password, user.getSalt());

        return MessageDigest.isEqual(computedHash.getBytes(StandardCharsets.UTF_8), user.getPasswordHash().getBytes(StandardCharsets.UTF_8));
    }

    private String getNewSavedRefreshToken(UserEntity user) {
        String refreshTokenRaw = jwtService.generateRefreshToken();

        String refreshTokenHash = hashGenerator.hashString(refreshTokenRaw, ".");

        RefreshTokenEntity refreshToken = RefreshTokenEntity.builder()
                .userId(user.getId())
                .tokenHash(refreshTokenHash)
                .expiresAt(Instant.now().plusSeconds(securityConfig.getRefreshTokenDuration()))
                .revoked(false)
                .build();

        refreshTokenDAO.save(refreshToken);

        return refreshTokenRaw;
    }

    public TokenResponse login(String username, String password) throws Exception {
        UserEntity user = userDAO.findByUsername(username);
        if (user == null || !verifyPassword(password, user)) {
            throw new RuntimeException("Invalid username or password");
        }

        String accessToken = jwtService.generateToken(user.getUsername(), List.of("user"));

        return new TokenResponse(accessToken, getNewSavedRefreshToken(user));
    }

    public TokenResponse refreshAccessToken(String refreshTokenRaw) {
        String refreshTokenHash = hashGenerator.hashString(refreshTokenRaw,".");

        RefreshTokenEntity token = refreshTokenDAO.findByTokenHash(refreshTokenHash);
        if (token == null || token.getRevoked() || token.getExpiresAt().isBefore(Instant.now())) {
            throw new RuntimeException("Invalid refresh token");
        }

        UserEntity user = userDAO.find(token.getUserId());
        if (user == null) {
            throw new RuntimeException("User not found");
        }

        String accessToken = jwtService.generateToken(user.getUsername(), List.of("user"));

        token.setRevoked(true);
        refreshTokenDAO.update(token.getId(), token);

        return new TokenResponse(accessToken, getNewSavedRefreshToken(user));
    }

    // Logout / revoke refresh token
    public void logout(String refreshTokenRaw) {
        String refreshTokenHash = hashGenerator.hashString(refreshTokenRaw, ".");
        RefreshTokenEntity token = refreshTokenDAO.findByTokenHash(refreshTokenHash);

        if (token != null) {
            token.setRevoked(true);
            refreshTokenDAO.update(token.getId(), token);
        }
    }

}
