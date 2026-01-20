package com.gestionhopital.hopital_backend.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;
import java.security.Key;
import java.util.Date;
import java.util.Base64;

@Component
public class JwtUtil {
    // clé fixe pour demo (doit faire au moins 32 caractères pour HS256)
    private final String SECRET_KEY = "d92ec9c93133cefc7eeeec97b78bcc586797cefa";
    private final Key key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    private final int expirationMs = 86400000; // 24 heures

    public String generateToken(String username, String role) {
        return Jwts.builder()
                .setSubject(username)
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationMs))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public Key getKey() {
        return key;
    }
}