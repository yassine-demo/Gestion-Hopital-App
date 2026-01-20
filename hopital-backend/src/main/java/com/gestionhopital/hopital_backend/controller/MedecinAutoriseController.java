package com.gestionhopital.hopital_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gestionhopital.hopital_backend.model.MedecinAutorise;
import com.gestionhopital.hopital_backend.repository.MedecinAutoriseRepository;

@RestController
@RequestMapping("/api/medecins-autorises")
@CrossOrigin("*")
public class MedecinAutoriseController {
    @Autowired
    private MedecinAutoriseRepository repository;

    @GetMapping
    public List<MedecinAutorise> getAll() { return repository.findAll(); }

    @PostMapping
    public MedecinAutorise create(@RequestBody MedecinAutorise medecin) { return repository.save(medecin); }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { repository.deleteById(id); }
    
    @PutMapping("/{id}")
    public ResponseEntity<MedecinAutorise> update(@PathVariable Long id, @RequestBody MedecinAutorise details) {
        MedecinAutorise medecin = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Médecin non trouvé"));
        
        medecin.setCin(details.getCin());
        medecin.setNomComplet(details.getNomComplet());
        medecin.setSpecialite(details.getSpecialite());
        medecin.setEmail(details.getEmail());
        
        return ResponseEntity.ok(repository.save(medecin));
    }
    
    
    }
    