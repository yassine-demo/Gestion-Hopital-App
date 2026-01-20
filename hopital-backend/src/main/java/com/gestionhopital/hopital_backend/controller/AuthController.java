package com.gestionhopital.hopital_backend.controller;

import com.gestionhopital.hopital_backend.dto.LoginRequest;
import com.gestionhopital.hopital_backend.dto.LoginResponse;
import com.gestionhopital.hopital_backend.model.User;
import com.gestionhopital.hopital_backend.model.Patient;
import com.gestionhopital.hopital_backend.repository.MedecinAutoriseRepository;
import com.gestionhopital.hopital_backend.repository.UserRepository;
import com.gestionhopital.hopital_backend.repository.PatientRepository;
import com.gestionhopital.hopital_backend.security.JwtUtil;

import jakarta.transaction.Transactional;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    private final MedecinAutoriseRepository medecinAutoriseRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final PatientRepository patientRepository; 
    private final PasswordEncoder passwordEncoder;

    public AuthController(AuthenticationManager authenticationManager,
                          JwtUtil jwtUtil,
                          UserRepository userRepository,
                          PasswordEncoder passwordEncoder,
                          MedecinAutoriseRepository medecinAutoriseRepository,
                          PatientRepository patientRepository) { 
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.medecinAutoriseRepository = medecinAutoriseRepository;
        this.patientRepository = patientRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
        );

        if (authentication.isAuthenticated()) {
            User user = userRepository.findByUsername(loginRequest.getUsername())
                    .orElseThrow(() -> new UsernameNotFoundException("Utilisateur non trouvé"));

            String token = jwtUtil.generateToken(user.getUsername(), user.getRole().name());

            return ResponseEntity.ok(new LoginResponse(
                    token,
                    user.getUsername(),
                    user.getRole().name(),
                    user.getNomComplet()
            ));
        } else {
            return ResponseEntity.status(401).body("Identifiants invalides");
        }
    }

    @PostMapping("/register")
    @Transactional
    public ResponseEntity<?> register(@RequestBody User user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Username déjà pris");
        }

        // 1. Sauvegarder l'utilisateur
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User savedUser = userRepository.save(user);

        // 2. CRÉATION DU PROFIL PATIENT 
        if (savedUser.getRole() == User.Role.PATIENT) {
            Patient patient = new Patient();
            patient.setNom(savedUser.getNomComplet());
            patient.setUsername(savedUser.getUsername());
            patient.setTelephone(user.getTelephone()); 
            patient.setAdresse(user.getAdresse()); 
            if (user.getDateNaissance() != null && !user.getDateNaissance().isEmpty()) {
                try {
                    patient.setDateNaissance(LocalDate.parse(user.getDateNaissance()));
                } catch (Exception e) {
                    System.out.println("Erreur format date : " + e.getMessage());
                }
            }
            
            patientRepository.save(patient);
        }
        return ResponseEntity.ok().body(Map.of("message", "Inscription réussie !"));
    }
}