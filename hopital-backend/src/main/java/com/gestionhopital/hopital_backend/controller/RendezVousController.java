package com.gestionhopital.hopital_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.gestionhopital.hopital_backend.model.RendezVous;
import com.gestionhopital.hopital_backend.model.Patient;
import com.gestionhopital.hopital_backend.model.Consultation;
import com.gestionhopital.hopital_backend.model.MedecinAutorise;
import com.gestionhopital.hopital_backend.repository.RendezVousRepository;
import com.gestionhopital.hopital_backend.repository.PatientRepository;
import com.gestionhopital.hopital_backend.repository.MedecinAutoriseRepository;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/rendez-vous")
@CrossOrigin(origins = "http://localhost:4200")
public class RendezVousController {
	
	@Autowired
	private com.gestionhopital.hopital_backend.repository.ConsultationRepository consultationRepository;
	
    @Autowired
    private RendezVousRepository rdvRepository;
    
    @Autowired
    private PatientRepository patientRepository;
    
    @Autowired
    private MedecinAutoriseRepository medecinAutoriseRepository;

    // --- CRÉATION ---
    @PostMapping("/{id}/terminer")
    public ResponseEntity<?> terminerRendezVous(@PathVariable Long id, @RequestBody Map<String, String> data) {
        RendezVous rdv = rdvRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("RDV non trouvé"));

        // 1. Créer la consultation
        Consultation consultation = new Consultation();
        consultation.setDiagnostic(data.get("diagnostic"));
        consultation.setOrdonnance(data.get("ordonnance"));
        consultation.setDateConsultation(java.time.LocalDateTime.now());
        consultation.setRendezVous(rdv);
        consultationRepository.save(consultation);

        // 2. Changer le statut du RDV en "TERMINE"
        rdv.setStatut("TERMINE");
        rdvRepository.save(rdv);

        return ResponseEntity.ok(Map.of("message", "Consultation enregistrée avec succès"));
    }
    
    
    @PostMapping
    public ResponseEntity<?> createRDV(@RequestBody Map<String, Object> request) {
        try {
            String patientUsername = (String) request.get("patientUsername");
            Object mIdObj = request.get("medecinId");
            
            if (mIdObj == null) return ResponseEntity.badRequest().body("ID Médecin manquant");
            Long medecinId = Long.valueOf(mIdObj.toString());

            Patient patient = patientRepository.findByUsername(patientUsername)
                .orElseThrow(() -> new RuntimeException("Patient non trouvé: " + patientUsername));

            MedecinAutorise medecin = medecinAutoriseRepository.findById(medecinId)
                .orElseThrow(() -> new RuntimeException("Médecin introuvable"));

            RendezVous rdv = new RendezVous();
            rdv.setDateHeure((String) request.get("dateHeure"));
            rdv.setMotif((String) request.get("motif"));
            rdv.setStatut("EN_ATTENTE");
            rdv.setPatient(patient);
            rdv.setMedecin(medecin); 

            return ResponseEntity.ok(rdvRepository.save(rdv));
            
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erreur : " + e.getMessage());
        }
    }

    // --- ROUTES MÉDECIN ---
    @GetMapping("/medecin/{medecinId}")
    public List<RendezVous> getRendezVousParMedecin(@PathVariable Long medecinId) {
        return rdvRepository.findByMedecinId(medecinId);
    }

    @PutMapping("/{id}/statut")
    public ResponseEntity<?> updateStatut(@PathVariable Long id, @RequestBody Map<String, String> request) {
        String nouveauStatut = request.get("statut");
        RendezVous rdv = rdvRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Rendez-vous non trouvé"));
        rdv.setStatut(nouveauStatut);
        rdvRepository.save(rdv);
        return ResponseEntity.ok(Map.of("message", "Statut mis à jour"));
    }
    
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/{id}/consultation")
    public ResponseEntity<?> getConsultationByRendezVous(@PathVariable Long id) {
        return consultationRepository.findByRendezVousId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // --- ROUTES PATIENT ---

    // Route par ID
    @GetMapping("/patient/id/{patientId}")
    public List<RendezVous> getRendezVousParPatientId(@PathVariable Long patientId) {
        return rdvRepository.findByPatientId(patientId);
    }

    // Route par USERNAME 
    @GetMapping("/patient/username/{username}")
    public List<RendezVous> getRendezVousParUsername(@PathVariable String username) {
        System.out.println("DEBUG: Recherche RDV pour : " + username);
        return rdvRepository.findByPatientUsername(username);
    }
}