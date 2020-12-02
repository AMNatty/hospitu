-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 29, 2020 at 03:20 PM
-- Server version: 5.7.24
-- PHP Version: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hospital`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id_admin` int(100) NOT NULL,
  `datum_narozeni` varchar(100) COLLATE utf8_czech_ci DEFAULT NULL,
  `rodne_cislo` varchar(100) COLLATE utf8_czech_ci DEFAULT NULL,
  `kancelar` varchar(100) COLLATE utf8_czech_ci DEFAULT NULL,
  `email` varchar(100) COLLATE utf8_czech_ci DEFAULT NULL,
  `telefonni_cislo` varchar(100) COLLATE utf8_czech_ci DEFAULT NULL,
  `bydliste` varchar(100) COLLATE utf8_czech_ci DEFAULT NULL,
  `login_number` int(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id_admin`, `datum_narozeni`, `rodne_cislo`, `kancelar`, `email`, `telefonni_cislo`, `bydliste`, `login_number`) VALUES
(1, '3.5.1999', '562458/2014', 'D104', 'martin.is.evil@seznam.cz', '568137477', 'Prerov', 1),
(2, '5.4.2000', '8654544/2000', 'D202', 'Marta@seznam.cz', '751558636', 'Prostejov', 10);

-- --------------------------------------------------------

--
-- Table structure for table `agent`
--

CREATE TABLE `agent` (
  `id_agent` int(100) NOT NULL,
  `home` varchar(200) COLLATE utf8_czech_ci DEFAULT NULL,
  `email` varchar(200) COLLATE utf8_czech_ci DEFAULT NULL,
  `phone` varchar(100) COLLATE utf8_czech_ci DEFAULT NULL,
  `insurance_company_number` int(10) NOT NULL,
  `login_number` int(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

--
-- Dumping data for table `agent`
--

INSERT INTO `agent` (`id_agent`, `home`, `email`, `phone`, `insurance_company_number`, `login_number`) VALUES
(1, 'Brno', 'agent01@seznam.cz', '453564254', 205, 2),
(2, 'Brno', 'agent02', '635123213', 205, 3);

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `id_department` int(100) NOT NULL,
  `name` varchar(55) COLLATE utf8_czech_ci NOT NULL,
  `open_since` time(3) NOT NULL,
  `open_until` time(3) NOT NULL,
  `location` varchar(45) COLLATE utf8_czech_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`id_department`, `name`, `open_since`, `open_until`, `location`) VALUES
(1, 'Neurologické oddělení', '10:00:00.000', '16:00:00.000', 'C107'),
(2, 'EEG', '08:00:00.000', '14:30:00.000', 'C104'),
(3, 'Kožní oddělení', '08:00:00.000', '17:00:00.000', 'A109'),
(4, 'Infekční oddělení', '06:00:00.000', '23:00:00.000', 'B205'),
(5, 'EKG', '08:00:00.000', '14:30:00.000', 'C110');

-- --------------------------------------------------------

--
-- Table structure for table `doctors`
--

CREATE TABLE `doctors` (
  `id_doctors` int(100) NOT NULL,
  `home` varchar(200) COLLATE utf8_czech_ci DEFAULT NULL,
  `email` varchar(100) COLLATE utf8_czech_ci DEFAULT NULL,
  `phone` int(10) DEFAULT NULL,
  `work_hours` int(10) NOT NULL,
  `department_number` int(10) NOT NULL,
  `login_number` int(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

--
-- Dumping data for table `doctors`
--

INSERT INTO `doctors` (`id_doctors`, `home`, `email`, `phone`, `work_hours`, `department_number`, `login_number`) VALUES
(1, 'Brno', 'lekar01@seznam.cz', 423561239, 1, 4, 4),
(2, 'Brno', 'lekar02@seznam.cz', 543687965, 2, 4, 5),
(3, 'Brno', 'lekar03@seznam.cz', 421356789, 4, 1, 6);

-- --------------------------------------------------------

--
-- Table structure for table `hours`
--

CREATE TABLE `hours` (
  `id_hours` int(100) NOT NULL,
  `since` time(3) NOT NULL,
  `until` time(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

--
-- Dumping data for table `hours`
--

INSERT INTO `hours` (`id_hours`, `since`, `until`) VALUES
(1, '06:00:00.000', '14:30:00.000'),
(2, '14:00:00.000', '22:30:00.000'),
(3, '22:00:00.000', '06:30:00.000'),
(4, '10:00:00.000', '16:00:00.000');

-- --------------------------------------------------------

--
-- Table structure for table `meds_supplies`
--

CREATE TABLE `meds_supplies` (
  `id_meds` int(100) NOT NULL,
  `name` varchar(45) COLLATE utf8_czech_ci NOT NULL,
  `type` varchar(45) COLLATE utf8_czech_ci NOT NULL,
  `in_stock` varchar(45) COLLATE utf8_czech_ci NOT NULL,
  `ordered` varchar(45) COLLATE utf8_czech_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

--
-- Dumping data for table `meds_supplies`
--

INSERT INTO `meds_supplies` (`id_meds`, `name`, `type`, `in_stock`, `ordered`) VALUES
(1, 'Obvazy', 'Vybavení', 'True', 'False'),
(2, 'Kepra 250mg', 'Léky', 'False', 'False'),
(3, 'Kepra 500mg', 'Léky', 'True', 'False'),
(4, 'Injekční stříkačky', 'Vybavení', 'True', 'False'),
(5, 'Sanytol', 'Vybavení', 'True', 'True'),
(6, 'Roušky', 'Vybavení', 'True', 'True'),
(7, 'Paralen 500mg', 'Léky', 'False', 'True'),
(8, 'Cefazolin 500mg', 'Léky', 'True', 'False'),
(9, 'Azytromycin 500mg', 'Léky', 'True', 'False'),
(10, 'Depakine 500mg', 'Léky', 'True', 'False');

-- --------------------------------------------------------

--
-- Table structure for table `patients`
--

CREATE TABLE `patients` (
  `id_patients` int(100) NOT NULL,
  `home` varchar(200) COLLATE utf8_czech_ci DEFAULT NULL,
  `email` varchar(100) COLLATE utf8_czech_ci DEFAULT NULL,
  `phone` int(11) DEFAULT NULL,
  `allergies` varchar(200) COLLATE utf8_czech_ci DEFAULT NULL,
  `health_issue` varchar(200) COLLATE utf8_czech_ci NOT NULL,
  `health_description` varchar(500) COLLATE utf8_czech_ci NOT NULL,
  `state` varchar(50) COLLATE utf8_czech_ci NOT NULL,
  `accepted` date DEFAULT NULL,
  `released` date DEFAULT NULL,
  `ordered_since` datetime DEFAULT NULL,
  `ordered_until` datetime DEFAULT NULL,
  `practitioner` int(11) NOT NULL,
  `insurance_agent` int(11) NOT NULL,
  `physician` int(11) NOT NULL,
  `login_number` int(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

--
-- Dumping data for table `patients`
--

INSERT INTO `patients` (`id_patients`, `home`, `email`, `phone`, `allergies`, `health_issue`, `health_description`, `state`, `accepted`, `released`, `ordered_since`, `ordered_until`, `practitioner`, `insurance_agent`, `physician`, `login_number`) VALUES
(1, 'Brno', 'pacient01@seznam.cz', 356478924, 'Prach', 'Zápal plic', 'Potíže s dýcháním.', 'čeká na vyšetření', '2020-12-01', NULL, '2020-12-02 12:00:00', '2020-12-02 12:20:00', 1, 1, 1, 7),
(2, 'Brno', 'pacient02@seznam.cz', 423512365, NULL, 'Angína', 'Podrážděný hrtan.', 'Ukončen', '2020-11-20', '2020-12-01', NULL, NULL, 1, 2, 2, 8),
(3, 'Brno', 'pacient03@seznam.cz', 223456881, 'Pyl', 'Epilepsie', 'Časté malé záchvaty. ', 'čeká na vyšetření', '2020-10-01', NULL, '2021-02-26 10:00:00', '2021-02-26 10:30:00', 1, 1, 3, 9);

-- --------------------------------------------------------

--
-- Table structure for table `patients_meds`
--

CREATE TABLE `patients_meds` (
  `id_patients` int(100) DEFAULT NULL,
  `id_meds` int(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

--
-- Dumping data for table `patients_meds`
--

INSERT INTO `patients_meds` (`id_patients`, `id_meds`) VALUES
(1, 9),
(3, 3),
(3, 10);

-- --------------------------------------------------------

--
-- Table structure for table `practitioners`
--

CREATE TABLE `practitioners` (
  `id_practioners` int(11) NOT NULL,
  `first_name` varchar(45) COLLATE utf8_czech_ci NOT NULL,
  `last_name` varchar(45) COLLATE utf8_czech_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

--
-- Dumping data for table `practitioners`
--

INSERT INTO `practitioners` (`id_practioners`, `first_name`, `last_name`) VALUES
(1, 'Pavel', 'Svoboda'),
(2, 'Hana', 'Procházková'),
(3, 'Zdeněk', 'Pokorný');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `us_id` int(11) NOT NULL,
  `us_login` varchar(24) COLLATE utf8_czech_ci NOT NULL,
  `us_salt` char(16) COLLATE utf8_czech_ci NOT NULL,
  `us_password` char(64) COLLATE utf8_czech_ci NOT NULL,
  `us_name` varchar(40) COLLATE utf8_czech_ci NOT NULL,
  `us_surname` varchar(40) COLLATE utf8_czech_ci NOT NULL,
  `us_perms` enum('PATIENT','DOCTOR','INSURANCE_WORKER','ADMIN') COLLATE utf8_czech_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`us_id`, `us_login`, `us_salt`, `us_password`, `us_name`, `us_surname`, `us_perms`) VALUES
(1, 'admin01', 'abcdef', '1ea4b3f80f8bc77e1e66d5a58021d46c58d4b16080315c4f16b99aaee492980c', 'Petr', 'Dvořák', 'ADMIN'),
(2, 'agent01', 'abcdef', '81c752a4000989f1f9cbfcc5986a335b6394fe69d0aa54228bcb8dc30c209f6d', 'Tomáš', 'Novotný', 'INSURANCE_WORKER'),
(3, 'agent02', 'abcdef', '5a94f1804833bb9b0152456e93fef37c25c8a3add89115008a9f2e65268f8ab5', 'Jan', 'Svoboda', 'INSURANCE_WORKER'),
(4, 'lekar01', 'abcdef', '039e6c09afc8125ece065d7a4889d6b6872e533d29304e6ec8b9d13c836fb083', 'Jan', 'Novák', 'DOCTOR'),
(5, 'lekar02', 'abcdef', '52768ec6fbaf8a66cfc8749fbd505162edefd1f55787efa9b5fd8e557da38b8d', 'Jana', 'Procházková', 'DOCTOR'),
(6, 'lekar03', 'abcdef', '373a7278a5535573a1329b7fa5bc70e02bf51fe511212a5d742586cd0cc98be5', 'Marie', 'Novotná', 'DOCTOR'),
(7, 'pacient01', 'abcdef', '3516588c86a8e297b02ab1e1cde3044560f461c8790abc8079a4ad1b142047ec', 'Jiří', 'Krejčí', 'PATIENT'),
(8, 'pacient02', 'abcdef', '9d6340bc1bbe26ef253983195865c0b8ae3a4ccc56ff0dd5d013aed80e7830a5', 'Marie', 'Dvořáková', 'PATIENT'),
(9, 'pacient03', 'abcdef', '19ba6ffb9f9dd05d8f30e6700148f8e2d7fbb9c19a8a5d99f363706758d109b1', 'Petr', 'Krejčí', 'PATIENT'),
(10, 'admin02', 'abcdef', '05f8813350811b78feea6bcd64ea2c2f5e783d0059700f139349ee3bb360b842', 'Martin', 'Zavadil', 'ADMIN');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD UNIQUE KEY `id` (`id_admin`),
  ADD KEY `foreign_id_login` (`login_number`);

--
-- Indexes for table `agent`
--
ALTER TABLE `agent`
  ADD UNIQUE KEY `id` (`id_agent`),
  ADD KEY `foreign_id_login` (`login_number`);

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD UNIQUE KEY `id` (`id_department`);

--
-- Indexes for table `doctors`
--
ALTER TABLE `doctors`
  ADD UNIQUE KEY `id` (`id_doctors`),
  ADD KEY `foreign_id` (`work_hours`) USING BTREE,
  ADD KEY `foreign_id2` (`department_number`) USING BTREE,
  ADD KEY `foreign_id_login` (`login_number`);

--
-- Indexes for table `hours`
--
ALTER TABLE `hours`
  ADD UNIQUE KEY `id` (`id_hours`);

--
-- Indexes for table `meds_supplies`
--
ALTER TABLE `meds_supplies`
  ADD UNIQUE KEY `id` (`id_meds`);

--
-- Indexes for table `patients`
--
ALTER TABLE `patients`
  ADD UNIQUE KEY `id` (`id_patients`),
  ADD KEY `foreign_id` (`insurance_agent`),
  ADD KEY `foreign_id2` (`physician`),
  ADD KEY `foreign_id3` (`practitioner`),
  ADD KEY `foreign_id_login` (`login_number`);

--
-- Indexes for table `patients_meds`
--
ALTER TABLE `patients_meds`
  ADD KEY `pacient_id` (`id_patients`),
  ADD KEY `meds_id` (`id_meds`);

--
-- Indexes for table `practitioners`
--
ALTER TABLE `practitioners`
  ADD UNIQUE KEY `id` (`id_practioners`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`us_id`),
  ADD UNIQUE KEY `users_us_login_uindex` (`us_login`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id_admin` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `agent`
--
ALTER TABLE `agent`
  MODIFY `id_agent` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `department`
--
ALTER TABLE `department`
  MODIFY `id_department` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `doctors`
--
ALTER TABLE `doctors`
  MODIFY `id_doctors` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `hours`
--
ALTER TABLE `hours`
  MODIFY `id_hours` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `meds_supplies`
--
ALTER TABLE `meds_supplies`
  MODIFY `id_meds` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `patients`
--
ALTER TABLE `patients`
  MODIFY `id_patients` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `practitioners`
--
ALTER TABLE `practitioners`
  MODIFY `id_practioners` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `us_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admin`
--
ALTER TABLE `admin`
  ADD CONSTRAINT `admin_ibfk_1` FOREIGN KEY (`login_number`) REFERENCES `users` (`us_id`) ON DELETE CASCADE;

--
-- Constraints for table `agent`
--
ALTER TABLE `agent`
  ADD CONSTRAINT `agent_ibfk_1` FOREIGN KEY (`login_number`) REFERENCES `users` (`us_id`) ON DELETE CASCADE;

--
-- Constraints for table `doctors`
--
ALTER TABLE `doctors`
  ADD CONSTRAINT `doctors_ibfk_1` FOREIGN KEY (`work_hours`) REFERENCES `hours` (`id_hours`) ON DELETE CASCADE,
  ADD CONSTRAINT `doctors_ibfk_2` FOREIGN KEY (`department_number`) REFERENCES `department` (`id_department`) ON DELETE CASCADE,
  ADD CONSTRAINT `doctors_ibfk_3` FOREIGN KEY (`login_number`) REFERENCES `users` (`us_id`) ON DELETE CASCADE;

--
-- Constraints for table `patients`
--
ALTER TABLE `patients`
  ADD CONSTRAINT `patients_ibfk_1` FOREIGN KEY (`physician`) REFERENCES `doctors` (`id_doctors`) ON DELETE CASCADE,
  ADD CONSTRAINT `patients_ibfk_2` FOREIGN KEY (`insurance_agent`) REFERENCES `agent` (`id_agent`) ON DELETE CASCADE,
  ADD CONSTRAINT `patients_ibfk_3` FOREIGN KEY (`practitioner`) REFERENCES `practitioners` (`id_practioners`) ON DELETE CASCADE,
  ADD CONSTRAINT `patients_ibfk_4` FOREIGN KEY (`login_number`) REFERENCES `users` (`us_id`) ON DELETE CASCADE;

--
-- Constraints for table `patients_meds`
--
ALTER TABLE `patients_meds`
  ADD CONSTRAINT `patients_meds_ibfk_1` FOREIGN KEY (`id_patients`) REFERENCES `patients` (`id_patients`) ON DELETE CASCADE,
  ADD CONSTRAINT `patients_meds_ibfk_2` FOREIGN KEY (`id_meds`) REFERENCES `meds_supplies` (`id_meds`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
