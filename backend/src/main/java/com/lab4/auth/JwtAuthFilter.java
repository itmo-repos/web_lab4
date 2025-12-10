package com.lab4.auth;

import jakarta.ws.rs.container.ContainerRequestFilter;
import jakarta.inject.Inject;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ResourceInfo;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.Provider;

import java.io.IOException;
import java.lang.reflect.Method;

import com.lab4.utils.JwtService;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;

@Provider
public class JwtAuthFilter implements ContainerRequestFilter {

    @Context
    private ResourceInfo resourceInfo;

    @Inject
    private JwtService jwtService;

    @Override
    public void filter(ContainerRequestContext requestContext) throws IOException {
        Method method = resourceInfo.getResourceMethod();
        
        if (method != null && method.isAnnotationPresent(Secured.class)) {
            String authHeader = requestContext.getHeaderString("Authorization");
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                requestContext.abortWith(Response.status(Response.Status.UNAUTHORIZED).build());
                return;
            }

            String token = authHeader.split("Bearer ")[1];

            try {
                Jws<Claims> claims = jwtService.parseToken(token);

                requestContext.setProperty("claims", claims);
            } catch (Exception e) {
                requestContext.abortWith(Response.status(Response.Status.UNAUTHORIZED).build());
            }
        }
    }
}
