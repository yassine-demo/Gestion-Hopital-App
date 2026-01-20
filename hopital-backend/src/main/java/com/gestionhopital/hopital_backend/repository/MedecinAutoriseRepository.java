package com.gestionhopital.hopital_backend.repository;

import com.gestionhopital.hopital_backend.model.MedecinAutorise;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface MedecinAutoriseRepository extends JpaRepository<MedecinAutorise, Long> {
    Optional<MedecinAutorise> findByCin(String cin);
}