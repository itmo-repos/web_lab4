package com.lab4.auth;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import lombok.Getter;

import org.eclipse.microprofile.config.inject.ConfigProperty;

@ApplicationScoped
@Getter
public class SecurityConfig {
    @Inject
    @ConfigProperty(name = "auth.password.pepper")
    private String passwordPepper;
    
    @Inject
    @ConfigProperty(name = "auth.password.hash.iterations", defaultValue = "310000")
    private int hashIterations;
    
    @Inject
    @ConfigProperty(name = "auth.password.hash.keylength", defaultValue = "256")
    private int hashKeyLength;
    
    @Inject
    @ConfigProperty(name = "auth.jwt.secret")
    private String jwtSecret;
    
    @Inject
    @ConfigProperty(name = "auth.jwt.access.duration", defaultValue = "900") // 15 минут
    private int accessTokenDuration;
    
    @Inject
    @ConfigProperty(name = "auth.jwt.refresh.duration", defaultValue = "604800") // 7 дней
    private int refreshTokenDuration;

}