package com.gestionhopital.hopital_backend.service;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import com.gestionhopital.hopital_backend.model.Patient;
import com.gestionhopital.hopital_backend.repository.PatientRepository;

import java.util.List;

@Service
@Transactional //pour gérer les transactions avec la BDD
@AllArgsConstructor //génére un constructeur avec tous les arguments (injection de dépendance)
public class PatientServiceImpl implements PatientService {

    private final PatientRepository patientRepository; // Injection du Repository

    @Override
    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    @Override
    public Patient getPatientById(Long id) {
        // Utilisation orElseThrow pour gérer le cas où le patient n'existe pas (sera géré par le controller)
        return patientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient non trouvé avec l'ID : " + id));
    }

    @Override
    public Patient savePatient(Patient patient) {
        //on pourrait ici ajouter de la logique métier (validation complexe..)
        return patientRepository.save(patient);
    }

    @Override
    public Patient updatePatient(Long id, Patient patientDetails) {
        Patient existingPatient = getPatientById(id); // Récupère et vérifie l'existence

        // m.à.j des champs
        existingPatient.setNom(patientDetails.getNom());
        existingPatient.setPrenom(patientDetails.getPrenom());
        existingPatient.setDateNaissance(patientDetails.getDateNaissance());
        existingPatient.setTelephone(patientDetails.getTelephone());
        existingPatient.setAdresse(patientDetails.getAdresse());

        return patientRepository.save(existingPatient);
    }

    @Override
    public void deletePatient(Long id) {
        // vérifier si le patient existe avant de supprimer
        if (!patientRepository.existsById(id)) {
             throw new RuntimeException("Patient non trouvé pour suppression avec l'ID : " + id);
        }
        patientRepository.deleteById(id);
    }

    @Override
    public List<Patient> searchPatients(String keyword) {
        return patientRepository.findByNomContainingIgnoreCase(keyword);
    }
}