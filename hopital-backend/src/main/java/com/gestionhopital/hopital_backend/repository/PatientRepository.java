package com.gestionhopital.hopital_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.gestionhopital.hopital_backend.model.Patient;
import java.util.List;
import java.util.Optional;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {
    
    List<Patient> findByNomContainingIgnoreCase(String keyword);
    
    Optional<Patient> findByUsername(String username);
}