# 🏥 Système de Gestion Hospitalière (Hopital-App)

Ce projet est une application web complète de gestion hospitalière permettant la prise de rendez-vous en ligne, la gestion des dossiers patients et le suivi des consultations médicales.

## 🚀 Fonctionnalités

### 👤 Espace Patient
- **Inscription & Connexion** : Création de compte sécurisée avec profil complet (Téléphone, Adresse, CIN).
- **Gestion des RDV** : Prise de rendez-vous avec un médecin spécifique.
- **Historique** : Consultation de ses anciens rendez-vous et des ordonnances prescrites.

### 🩺 Espace Médecin
- **Gestion de l'Agenda** : Validation ou refus des demandes de rendez-vous.
- **Consultation Digitale** : Saisie des diagnostics et génération d'ordonnances numériques.
- **Suivi Patient** : Accès à la liste des patients et à leurs antécédents.

### ⚙️ Espace Administrateur
- **Gestion des Utilisateurs** : Contrôle total sur les comptes patients et médecins.
- **Sécurité** : Gestion des accès et des autorisations (RBAC).

## 🛠️ Technologies Utilisées

**Backend :**
- Java 17 / Spring Boot 3
- Spring Security & JWT (Authentification sécurisée)
- Spring Data JPA (Hibernate)
- MySQL / H2 Database

**Frontend :**
- Angular 17+
- TypeScript
- Bootstrap 5 (Design Responsive)
- SweetAlert2 (Notifications)

## 📁 Structure du Projet

/hopital-backend  -> API REST (Spring Boot)
/hopital-frontend -> Interface Utilisateur (Angular)
/database         -> Scripts SQL et export de la structure
⚙️ Installation et Lancement
1. Backend (Spring Boot)
Configurez votre base de données dans src/main/resources/application.properties.

Lancez l'application via votre IDE (IntelliJ/Eclipse) ou en ligne de commande :

mvn spring-boot:run

2. Frontend (Angular)
Installez les dépendances :

npm install

Lancez le serveur de développement :

ng serve
Accédez à l'application sur http://localhost:4200.

🔒 Sécurité
L'application utilise des JSON Web Tokens (JWT) pour sécuriser les échanges. Chaque rôle (ADMIN, MEDECIN, PATIENT) possède des permissions spécifiques pour garantir la confidentialité des données médicales.

Auteur : ALIMI Yassine

Année Universitaire : 2025-2026
