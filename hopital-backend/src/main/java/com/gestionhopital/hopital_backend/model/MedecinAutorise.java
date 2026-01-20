package com.gestionhopital.hopital_backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "medecin_autorise")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MedecinAutorise {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, nullable = false)
    private String cin; 
    
    private String nomComplet;
    private String specialite;
    private String telephone; 
    private String email;

    @ManyToOne
    @JoinColumn(name = "service_id")
    private Service service;

    public MedecinAutorise(String cin, String nomComplet, String specialite, String telephone, String email) {
        this.cin = cin;
        this.nomComplet = nomComplet;
        this.specialite = specialite;
        this.telephone = telephone;
        this.email = email;
    }
}