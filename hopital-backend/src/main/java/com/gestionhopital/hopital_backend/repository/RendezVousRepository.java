package com.gestionhopital.hopital_backend.repository;

import com.gestionhopital.hopital_backend.model.RendezVous;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RendezVousRepository extends JpaRepository<RendezVous, Long> {

    // 1. Trouver par Username
    @Query("SELECT r FROM RendezVous r WHERE r.patient.username = :username")
    List<RendezVous> findByPatientUsername(@Param("username") String username);

    // 2. Trouver par ID du Patient
    @Query("SELECT r FROM RendezVous r WHERE r.patient.id = :patientId")
    List<RendezVous> findByPatientId(@Param("patientId") Long patientId);

    // 3. Trouver par ID du Médecin (MedecinDashboard)
    @Query("SELECT r FROM RendezVous r WHERE r.medecin.id = :medecinId")
    List<RendezVous> findByMedecinId(@Param("medecinId") Long medecinId);
}