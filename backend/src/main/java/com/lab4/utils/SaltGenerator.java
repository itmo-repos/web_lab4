package com.lab4.utils;

import java.security.SecureRandom;
import java.util.Base64;

public class SaltGenerator {
    private static final SecureRandom SECURE_RANDOM = new SecureRandom();
    private static final int SALT_SIZE_BYTES = 32;

    public static String generateSalt() {
        byte[] salt = new byte[SALT_SIZE_BYTES];
        SECURE_RANDOM.nextBytes(salt);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(salt);
    }

    public static byte[] generateSaltBytes() {
        byte[] salt = new byte[SALT_SIZE_BYTES];
        SECURE_RANDOM.nextBytes(salt);
        return salt;
    }
}