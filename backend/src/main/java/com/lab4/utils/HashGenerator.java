package com.lab4.utils;

import java.nio.charset.StandardCharsets;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.Base64;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;

import com.lab4.auth.SecurityConfig;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class HashGenerator {

    @Inject
    private SecurityConfig securityConfig;
    
    public String hashPassword(String password, String salt) {
        return hashString(securityConfig.getPasswordPepper() + password, salt);
    }

    public String hashString(String str, String salt) {
        try {
            PBEKeySpec spec = new PBEKeySpec(str.toCharArray(), salt.getBytes(StandardCharsets.UTF_8), securityConfig.getHashIterations(), securityConfig.getHashKeyLength());
            SecretKeyFactory skf = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256");
            
            byte[] hash = skf.generateSecret(spec).getEncoded();
            
            return Base64.getEncoder().encodeToString(hash);
        } catch (NoSuchAlgorithmException | InvalidKeySpecException e) {
            throw new RuntimeException("Hash generation error");
        }
    }

}
