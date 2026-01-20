package com.gestionhopital.hopital_backend.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.gestionhopital.hopital_backend.model.Patient;
import com.gestionhopital.hopital_backend.service.PatientService;

import java.util.List;



@RestController
@RequestMapping("/api/patients") // Définit le chemin de base pour toutes les méthodes de ce contrôleur
@AllArgsConstructor // Injecte automatiquement PatientService via le constructeur (grâce à Lombok)
public class PatientController {

    private final PatientService patientService;

    /**
     * Endpoint pour récupérer la liste de tous les patients.
     * URL: GET /api/patients
     */
    @GetMapping
    public List<Patient> getAllPatients() {
        return patientService.getAllPatients();
    }

    /**
     * Endpoint pour consulter les détails d'un patient par ID.
     * URL: GET /api/patients/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<Patient> getPatientById(@PathVariable Long id) {
        try {
            Patient patient = patientService.getPatientById(id);
            // Retourne 200 OK avec le corps du patient
            return ResponseEntity.ok(patient);
        } catch (RuntimeException e) {
            // Gère le cas où le PatientService lève une exception (Patient non trouvé)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // Retourne 404 Not Found
        }
    }

    /**
     * Endpoint pour ajouter un nouveau patient.
     * URL: POST /api/patients
     */
    @PostMapping
    public ResponseEntity<Patient> createPatient(@RequestBody Patient patient) {
        Patient savedPatient = patientService.savePatient(patient);
        //retourne la ressource créée avec le statut 201 CREATED
        return new ResponseEntity<>(savedPatient, HttpStatus.CREATED);
    }

    /**
     * Endpoint pour modifier les informations d’un patient.
     * URL: PUT /api/patients/{id}
     */
    @PutMapping("/{id}")
    public ResponseEntity<Patient> updatePatient(@PathVariable Long id, @RequestBody Patient patientDetails) {
        try {
            Patient updatedPatient = patientService.updatePatient(id, patientDetails);
            return ResponseEntity.ok(updatedPatient); // Retourne 200 OK
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // Retourne 404 Not Found
        }
    }

    /**
     * Endpoint pour supprimer un patient.
     * URL: DELETE /api/patients/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePatient(@PathVariable Long id) {
        try {
            patientService.deletePatient(id);
            //retourne le statut 204 NO CONTENT (réponse standard pour une suppression réussie sans corps)
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            // gère le cas où le patient n'est pas trouvé ou erreur de suppression
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * Endpoint de recherche par mot-clé (dans le nom).
     * URL: GET /api/patients/search?keyword=XXX
     */
    @GetMapping("/search")
    public List<Patient> searchPatients(@RequestParam(required = true) String keyword) {
        return patientService.searchPatients(keyword);
    }
}