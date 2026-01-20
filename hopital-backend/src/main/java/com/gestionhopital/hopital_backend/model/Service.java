package com.gestionhopital.hopital_backend.model;

import lombok.*;
import jakarta.persistence.*;

@Entity
@Data
@NoArgsConstructor @AllArgsConstructor
public class Service {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, nullable = false)
    private String nom;
    
    private String description;
    
    //il n y'a pas de relation ManyToMany ou OneToMany ici pour simplifier le mapping
}