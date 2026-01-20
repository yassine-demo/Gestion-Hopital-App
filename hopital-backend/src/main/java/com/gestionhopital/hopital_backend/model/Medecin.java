package com.gestionhopital.hopital_backend.model;

import lombok.*;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor @AllArgsConstructor
public class Medecin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String nom;
    private String prenom;
    private String specialite;
    private String telephone;
    
    // Relation ManyToOne : Un service peut avoir plusieurs médecins
    @ManyToOne
    @JoinColumn(name = "service_id", nullable = false)
    private Service service;
}