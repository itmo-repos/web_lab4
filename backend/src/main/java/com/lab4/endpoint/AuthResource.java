package com.lab4.endpoint;

import com.lab4.bean.AuthService;
import com.lab4.dto.*;
import com.lab4.entity.UserEntity;

import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/auth")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AuthResource {

    @Inject
    private AuthService authService;


    @POST
    @Path("/register")
    public Response register(RegisterRequest request) {
        UserEntity user = authService.register(request.username(), request.password());

        return Response.status(Response.Status.CREATED)
                .entity(new UserResponse(user.getId(), user.getUsername()))
                .build();
    }

    @POST
    @Path("/login")
    public Response login(LoginRequest request) {
        TokenResponse tokens = authService.login(request.username(), request.password());
        return Response.ok(tokens).build();
    }

    @POST
    @Path("/refresh")
    public Response refresh(TokenRefreshRequest request) {
        TokenResponse newTokens = authService.refreshAccessToken(request.refreshToken());
        return Response.ok(newTokens).build();
    }

    @POST
    @Path("/logout")
    public Response logout(TokenRefreshRequest request) {
        authService.logout(request.refreshToken());
        return Response.noContent().build();
    }
}