package com.gestionhopital.hopital_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gestionhopital.hopital_backend.model.Service;

@Repository
public interface ServiceRepository extends JpaRepository<Service, Long> {
    
    Service findByNom(String nom);
}