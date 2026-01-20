package com.gestionhopital.hopital_backend.model;

import lombok.*;
import jakarta.persistence.*;

@Entity
@Table(name = "app_users") // 
@Data
@NoArgsConstructor 
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String cin;
    private String nomComplet;
    private String telephone;
    private String specialite;
    private String adresse;
    private String DateNaissance;
    @Column(unique = true, nullable = false)
    private String username; 
    
    @Column(nullable = false)
    private String password; 
    
    @Enumerated(EnumType.STRING)
    private Role role; 

    public enum Role {
        ADMIN, MEDECIN, PATIENT
    }
}