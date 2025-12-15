package com.lab4.exception;

import com.lab4.dto.ErrorResponse;

import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;

@Provider
public class AuthExceptionMapper implements ExceptionMapper<AuthException> {

    @Override
    public Response toResponse(AuthException exception) {
        return Response.status(exception.getStatus())
                .entity(new ErrorResponse(exception.getMessage()))
                .build();
    }
}
