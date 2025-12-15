package com.lab4.exception;

import jakarta.ws.rs.core.Response;

public class AuthException extends RuntimeException {
    private final Response.Status status;

    public AuthException(Response.Status status, String message) {
        super(message);
        this.status = status;
    }

    public Response.Status getStatus() {
        return status;
    }
}