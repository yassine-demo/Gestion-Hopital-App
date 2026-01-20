package com.gestionhopital.hopital_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gestionhopital.hopital_backend.model.Medecin;

import java.util.List;

@Repository
public interface MedecinRepository extends JpaRepository<Medecin, Long> {
    

    List<Medecin> findBySpecialite(String specialite);
    List<Medecin> findByServiceId(Long serviceId);
}