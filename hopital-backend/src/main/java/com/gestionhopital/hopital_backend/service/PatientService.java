package com.gestionhopital.hopital_backend.service;

import java.util.List;

import com.gestionhopital.hopital_backend.model.Patient;

public interface PatientService {
    Patient savePatient(Patient patient);
    Patient updatePatient(Long id, Patient patientDetails);
    void deletePatient(Long id);
    List<Patient> getAllPatients();
    Patient getPatientById(Long id);
    List<Patient> searchPatients(String keyword);
}