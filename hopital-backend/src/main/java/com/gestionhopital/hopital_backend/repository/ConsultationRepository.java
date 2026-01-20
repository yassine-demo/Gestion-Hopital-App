package com.gestionhopital.hopital_backend.repository;

import com.gestionhopital.hopital_backend.model.Consultation;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ConsultationRepository extends JpaRepository<Consultation, Long> {
    //pour que le patient puisse retrouver son ordonnance via le RDV
    Optional<Consultation> findByRendezVousId(Long rendezVousId);
}