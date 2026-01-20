package com.gestionhopital.hopital_backend.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor @AllArgsConstructor
public class Consultation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String diagnostic;

    @Column(columnDefinition = "TEXT")
    private String ordonnance;

    private LocalDateTime dateConsultation;

    @OneToOne
    @JoinColumn(name = "rendezvous_id", nullable = false)
    private RendezVous rendezVous;
}