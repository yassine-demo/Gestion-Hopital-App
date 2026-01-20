package com.gestionhopital.hopital_backend.dto;

public class LoginResponse {
    private String token;
    private String username;
    private String role;
    private String nomComplet;


    public LoginResponse(String token, String username, String role, String nomComplet) {
        this.token = token;
        this.username = username;
        this.role = role;
        this.nomComplet = nomComplet;
    }

    // default constructor
    public LoginResponse() {
    }

    // Getters & Setters
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getNomComplet() {
        return nomComplet;
    }

    public void setNomComplet(String nomComplet) {
        this.nomComplet = nomComplet;
    }
}