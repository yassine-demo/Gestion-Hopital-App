package com.gestionhopital.hopital_backend.model;

import lombok.*;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.math.BigDecimal;

@Entity
@Data
@NoArgsConstructor @AllArgsConstructor
public class Facture {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private LocalDate dateFacturation;
    
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal montantTotal;
    
    private boolean paye = false;
    
    // Relation : Une facture est liée à un seul patient
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;
}