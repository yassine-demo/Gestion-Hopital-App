package com.gestionhopital.hopital_backend;

import com.gestionhopital.hopital_backend.model.MedecinAutorise;
import com.gestionhopital.hopital_backend.model.User;
import com.gestionhopital.hopital_backend.repository.MedecinAutoriseRepository;
import com.gestionhopital.hopital_backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class HopitalBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(HopitalBackendApplication.class, args);
    }

    @Bean
    CommandLineRunner start(UserRepository userRepository, 
            MedecinAutoriseRepository medecinRepo, 
            PasswordEncoder passwordEncoder) {
        return args -> {
            //gérer l'ADMIN
            if (userRepository.findByUsername("admin").isEmpty()) {
                User admin = new User();
                admin.setUsername("admin");
                admin.setPassword(passwordEncoder.encode("1234")); 
                admin.setRole(User.Role.ADMIN);
                userRepository.save(admin);
                System.out.println("Compte ADMINISTRATEUR créé : admin / 1234");
            }

            // les MÉDECINS AUTORISÉS
            if (medecinRepo.count() == 0) {
                medecinRepo.save(new MedecinAutorise("14422231", "Dr. Yassine", "Généraliste", "58049833", "its.yassine.alimi@gmail.com"));
                medecinRepo.save(new MedecinAutorise("11223355", "Dr. Sonia", "Pédiatre", "99111222", "sonia@gmail.com"));
                medecinRepo.save(new MedecinAutorise("10229933", "Dr. Hamza", "Neuro", "22777111", "hamza@gmail.com"));
                System.out.println("Base de données des médecins autorisés initialisée !");
            }
        };
    }
}