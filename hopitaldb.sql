-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jan 20, 2026 at 03:48 PM
-- Server version: 8.2.0
-- PHP Version: 8.2.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hopitaldb`
--

-- --------------------------------------------------------

--
-- Table structure for table `app_user`
--

DROP TABLE IF EXISTS `app_user`;
CREATE TABLE IF NOT EXISTS `app_user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('ADMINISTRATEUR','MEDECIN','PATIENT') DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_3k4cplvh82srueuttfkwnylq0` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `app_users`
--

DROP TABLE IF EXISTS `app_users`;
CREATE TABLE IF NOT EXISTS `app_users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `password` varchar(255) NOT NULL,
  `role` enum('ADMIN','MEDECIN','PATIENT') DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `cin` varchar(255) DEFAULT NULL,
  `nom_complet` varchar(255) DEFAULT NULL,
  `specialite` varchar(255) DEFAULT NULL,
  `telephone` varchar(255) DEFAULT NULL,
  `date_naissance` varchar(255) DEFAULT NULL,
  `adresse` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_spsnwr241e9k9c8p5xl4k45ih` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `app_users`
--

INSERT INTO `app_users` (`id`, `password`, `role`, `username`, `cin`, `nom_complet`, `specialite`, `telephone`, `date_naissance`, `adresse`) VALUES
(1, '$2a$10$aS/Ht18h7w3CYjnthj2eu.HAyJ88ALrWtwQLzhOSflH/Oq/1t7DAG', 'ADMIN', 'admin', NULL, NULL, NULL, NULL, NULL, NULL),
(2, '$2a$10$tIKEspoEKNnZWmOBa7Dp5.IKazkAkCfVRAsUD01AgnRJMCaM3XTB.', 'PATIENT', 'Mohamed', '12211223', 'Mohamed Tounsi', '', NULL, NULL, NULL),
(3, '$2a$10$/rJfIfIWGXrVmG4A/rYb/.3dVfgGE3qlk5Y5R0idHJRc.tK2thwYC', 'PATIENT', 'Ala', '12221111', 'Ala Tounsi', NULL, NULL, NULL, NULL),
(4, '$2a$10$4n3xe/E2WjK6uD45OHTJs.wzsNvyqb7rtI7CvUcvGsadK76lYLIrK', 'PATIENT', 'Jlassi Med', '33445577', 'mohamed jlassi', NULL, NULL, NULL, NULL),
(5, '$2a$10$ybEp5GL2nua6XyKmz9CPCuz.5r8espPnRj/07crAqeIlykaTA8gUm', 'PATIENT', 'Wael jlassi', '11223333', 'Wael Jlassi', NULL, NULL, NULL, NULL),
(6, '$2a$10$rqZfKc7LFKmhyX1WFsEYrOuQ0VQLwIBDkkEkU5Q.6zzKa0uqHSiAS', 'PATIENT', 'Patient', '00000000', 'Patient Test', NULL, NULL, NULL, NULL),
(7, '$2a$10$X9S7LzgTZ7ewt94PMakqYeFc01WSpvIOpT.3HAMxwtTwgvmghZ1mq', 'PATIENT', 'fatma', '99999999', 'fatma tounsi', NULL, NULL, NULL, NULL),
(9, '$2a$10$mnayupJGyVrxEn6DtyLIoeeb9a3kZYUU6s3GzTZlwXZKwieoGjnuO', 'MEDECIN', 'yassine', '14422231', 'yassine alimi', 'Généraliste', NULL, NULL, NULL),
(10, '$2a$10$WC1vs.SDpaAReUImjY2TtO1qRvWPbYPxvdnlebtrwujnwUJzurokq', 'PATIENT', 'wael', '55444999', 'Wael Ayari', NULL, NULL, NULL, NULL),
(13, '$2a$10$sK8f.olu7bngZyBmit7RLe1EcrSQH4qHcyOODRCs9RtEe8fNLVGqK', 'PATIENT', 'walid', '44999888', 'walid med', NULL, NULL, NULL, NULL),
(14, '$2a$10$yo1DpgWMQixM/rfGUBjiFOZFntezFPtLk1IwZ33yR./8/K20dktaK', 'PATIENT', 'Loay', '11666777', 'Loay louati', NULL, NULL, NULL, NULL),
(15, '$2a$10$08pGqzVO.IMxEs.0CoHlMO2Cb8WrHwIBDRCC3CFFalHnfwA9KN4p6', 'PATIENT', 'islem', '44111777', 'islem hlel', NULL, NULL, NULL, NULL),
(16, '$2a$10$EioCuRSjHUEp13Y/H/NlsOmbMCmgpkoKq88Mx9tjjFpSL/mRRbRsW', 'PATIENT', 'rania', '44555888', 'rania gharbi', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `consultation`
--

DROP TABLE IF EXISTS `consultation`;
CREATE TABLE IF NOT EXISTS `consultation` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `date_consultation` datetime(6) DEFAULT NULL,
  `diagnostic` text,
  `ordonnance` text,
  `rendezvous_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_fbsqfswfh72lksjj4yyg7w1ty` (`rendezvous_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `consultation`
--

INSERT INTO `consultation` (`id`, `date_consultation`, `diagnostic`, `ordonnance`, `rendezvous_id`) VALUES
(1, '2026-01-18 15:46:48.731825', 'Grippe', 'Doliprane 3 fois/jour', 1),
(2, '2026-01-19 09:01:58.595818', 'Migraine', 'Doliprane 3*/jour', 3),
(3, '2026-01-19 10:47:59.072780', 'Grippe confirmé', 'Augmentin 3*/jours', 4),
(4, '2026-01-19 10:57:19.998564', 'Migraine', 'Doliprane 3*/jour', 5);

-- --------------------------------------------------------

--
-- Table structure for table `facture`
--

DROP TABLE IF EXISTS `facture`;
CREATE TABLE IF NOT EXISTS `facture` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `date_facturation` date DEFAULT NULL,
  `montant_total` decimal(10,2) NOT NULL,
  `paye` bit(1) NOT NULL,
  `patient_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKfsdi28aa87t124c43hwtvaly5` (`patient_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `medecin`
--

DROP TABLE IF EXISTS `medecin`;
CREATE TABLE IF NOT EXISTS `medecin` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) DEFAULT NULL,
  `prenom` varchar(255) DEFAULT NULL,
  `specialite` varchar(255) DEFAULT NULL,
  `telephone` varchar(255) DEFAULT NULL,
  `service_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKqqd57ie8j51hdpmbt91ctquhh` (`service_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `medecin_autorise`
--

DROP TABLE IF EXISTS `medecin_autorise`;
CREATE TABLE IF NOT EXISTS `medecin_autorise` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `cin` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `nom_complet` varchar(255) DEFAULT NULL,
  `specialite` varchar(255) DEFAULT NULL,
  `telephone` varchar(255) DEFAULT NULL,
  `service_id` bigint DEFAULT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `prenom` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_ma9np5ht3hvq4vyedf5cndqfc` (`cin`),
  KEY `FKk560rv998g1ykwktossexql79` (`service_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `medecin_autorise`
--

INSERT INTO `medecin_autorise` (`id`, `cin`, `email`, `nom_complet`, `specialite`, `telephone`, `service_id`, `nom`, `prenom`) VALUES
(1, '14422231', 'its.yassine.alimi@gmail.com', 'Dr. Yassine', 'Généraliste', '58049833', 1, NULL, NULL),
(2, '11223355', 'sonia@gmail.com', 'Dr. Sonia', 'Pédiatre', '99111222', 1, NULL, NULL),
(3, '10229933', 'hamza1@gmail.com', 'Dr. Hamza', 'Neuro', '22777111', 1, NULL, NULL),
(4, '22001133', 'samir@gmail.com', 'Samir', 'Généraliste', NULL, 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `patient`
--

DROP TABLE IF EXISTS `patient`;
CREATE TABLE IF NOT EXISTS `patient` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `adresse` varchar(255) DEFAULT NULL,
  `date_naissance` date DEFAULT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `prenom` varchar(255) DEFAULT NULL,
  `telephone` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `patient`
--

INSERT INTO `patient` (`id`, `adresse`, `date_naissance`, `nom`, `prenom`, `telephone`, `username`) VALUES
(1, 'Tunis', '2002-10-23', 'Yassine', 'Alimi', '58049831', NULL),
(4, 'Tunis', '2002-02-22', 'wael', 'jlassi', '00000000', NULL),
(5, 'Ben arous', '2002-12-04', 'maryem', 'tounsi', '11222333', 'fatma'),
(7, 'Beja', '2002-01-01', 'Taher', 'Jlassi', '99222111', NULL),
(9, 'Beja', '1998-02-10', 'Samira', 'Youssef', '26333777', NULL),
(10, NULL, NULL, 'walid med', NULL, NULL, 'walid'),
(11, NULL, NULL, 'Loay louati', NULL, NULL, 'Loay'),
(12, NULL, NULL, 'islem hlel', NULL, NULL, 'islem'),
(13, NULL, NULL, 'rania gharbi', NULL, NULL, 'rania');

-- --------------------------------------------------------

--
-- Table structure for table `rendez_vous`
--

DROP TABLE IF EXISTS `rendez_vous`;
CREATE TABLE IF NOT EXISTS `rendez_vous` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `date_heure` varchar(255) DEFAULT NULL,
  `motif` varchar(255) DEFAULT NULL,
  `statut` varchar(255) DEFAULT NULL,
  `medecin_id` bigint NOT NULL,
  `patient_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKod11e2h2sycvoec892m6vwnbh` (`medecin_id`),
  KEY `FK35ayulwe26jii3vq14v6sokp3` (`patient_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `rendez_vous`
--

INSERT INTO `rendez_vous` (`id`, `date_heure`, `motif`, `statut`, `medecin_id`, `patient_id`) VALUES
(1, '2026-01-24T14:32', 'Grippe', 'TERMINE', 1, 5),
(2, '2026-01-23T08:08', 'Maladie', 'EN_ATTENTE', 1, 5),
(3, '2026-02-22T10:00', 'Consultation', 'TERMINE', 1, 10),
(4, '2026-01-20T11:00', 'Grippe', 'TERMINE', 1, 12),
(5, '2026-01-20T08:10', 'Grippe', 'TERMINE', 1, 13);

-- --------------------------------------------------------

--
-- Table structure for table `service`
--

DROP TABLE IF EXISTS `service`;
CREATE TABLE IF NOT EXISTS `service` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `nom` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_aevnlbyfojbvh321sdg15yuya` (`nom`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `service`
--

INSERT INTO `service` (`id`, `description`, `nom`) VALUES
(1, 'Service principal', 'Médecine Générale');

-- --------------------------------------------------------

--
-- Table structure for table `traitement`
--

DROP TABLE IF EXISTS `traitement`;
CREATE TABLE IF NOT EXISTS `traitement` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `date_debut` date DEFAULT NULL,
  `date_fin` date DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `medecin_id` bigint NOT NULL,
  `patient_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKcryhyrgyp90y46bnq5y38v2d` (`medecin_id`),
  KEY `FKn7mro3312dk8jx63f1opqnyvo` (`patient_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `consultation`
--
ALTER TABLE `consultation`
  ADD CONSTRAINT `FKm87jo1vfyj5npbtdggjs0tkdu` FOREIGN KEY (`rendezvous_id`) REFERENCES `rendez_vous` (`id`);

--
-- Constraints for table `facture`
--
ALTER TABLE `facture`
  ADD CONSTRAINT `FKfsdi28aa87t124c43hwtvaly5` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`id`);

--
-- Constraints for table `medecin`
--
ALTER TABLE `medecin`
  ADD CONSTRAINT `FKqqd57ie8j51hdpmbt91ctquhh` FOREIGN KEY (`service_id`) REFERENCES `service` (`id`);

--
-- Constraints for table `medecin_autorise`
--
ALTER TABLE `medecin_autorise`
  ADD CONSTRAINT `FKk560rv998g1ykwktossexql79` FOREIGN KEY (`service_id`) REFERENCES `service` (`id`);

--
-- Constraints for table `rendez_vous`
--
ALTER TABLE `rendez_vous`
  ADD CONSTRAINT `FK35ayulwe26jii3vq14v6sokp3` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`id`),
  ADD CONSTRAINT `FKod11e2h2sycvoec892m6vwnbh` FOREIGN KEY (`medecin_id`) REFERENCES `medecin_autorise` (`id`);

--
-- Constraints for table `traitement`
--
ALTER TABLE `traitement`
  ADD CONSTRAINT `FKcryhyrgyp90y46bnq5y38v2d` FOREIGN KEY (`medecin_id`) REFERENCES `medecin` (`id`),
  ADD CONSTRAINT `FKn7mro3312dk8jx63f1opqnyvo` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
