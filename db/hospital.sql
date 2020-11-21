-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 21, 2020 at 04:03 PM
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
  `id_admin` int(11) NOT NULL,
  `first_name` varchar(55) COLLATE utf8_czech_ci NOT NULL,
  `last_name` varchar(55) COLLATE utf8_czech_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id_admin`, `first_name`, `last_name`) VALUES
(1, 'Petr', 'Dvořák');

-- --------------------------------------------------------

--
-- Table structure for table `agent`
--

CREATE TABLE `agent` (
  `id_agent` int(11) NOT NULL,
  `first_name` varchar(55) COLLATE utf8_czech_ci NOT NULL,
  `last_name` varchar(55) COLLATE utf8_czech_ci NOT NULL,
  `insurance_company_number` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

--
-- Dumping data for table `agent`
--

INSERT INTO `agent` (`id_agent`, `first_name`, `last_name`, `insurance_company_number`) VALUES
(1, 'Tomáš', 'Novotný', 205),
(2, 'Jan', 'Svoboda', 205);

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `id_department` int(11) NOT NULL,
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
  `id_doctors` int(11) NOT NULL,
  `first_name` varchar(55) COLLATE utf8_czech_ci NOT NULL,
  `last_name` varchar(55) COLLATE utf8_czech_ci NOT NULL,
  `work_hours` int(10) NOT NULL,
  `department_number` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

--
-- Dumping data for table `doctors`
--

INSERT INTO `doctors` (`id_doctors`, `first_name`, `last_name`, `work_hours`, `department_number`) VALUES
(1, 'Jan', 'Novák', 1, 4),
(2, 'Jana', 'Procházková', 2, 4),
(3, 'Marie', 'Novotná', 4, 1);

-- --------------------------------------------------------

--
-- Stand-in structure for view `doctor_view`
-- (See below for the actual view)
--
CREATE TABLE `doctor_view` (
`DoctorID` int(11)
,`first_name` varchar(55)
,`last_name` varchar(55)
,`works_since` time(3)
,`works_until` time(3)
,`workplace` varchar(55)
,`number_of_pacients` bigint(21)
);

-- --------------------------------------------------------

--
-- Table structure for table `hours`
--

CREATE TABLE `hours` (
  `id_hours` int(11) NOT NULL,
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
-- Table structure for table `login_admins`
--

CREATE TABLE `login_admins` (
  `login_id` int(11) NOT NULL,
  `admin_id` int(11) NOT NULL,
  `login` varchar(20) COLLATE utf8_czech_ci NOT NULL,
  `password` varchar(20) COLLATE utf8_czech_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

--
-- Dumping data for table `login_admins`
--

INSERT INTO `login_admins` (`login_id`, `admin_id`, `login`, `password`) VALUES
(1, 1, 'admin01', 'admin01');

-- --------------------------------------------------------

--
-- Table structure for table `login_agent`
--

CREATE TABLE `login_agent` (
  `login_id` int(11) NOT NULL,
  `agent_id` int(11) NOT NULL,
  `login` varchar(20) COLLATE utf8_czech_ci NOT NULL,
  `password` varchar(20) COLLATE utf8_czech_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

--
-- Dumping data for table `login_agent`
--

INSERT INTO `login_agent` (`login_id`, `agent_id`, `login`, `password`) VALUES
(1, 1, 'agent01', 'agent01'),
(2, 2, 'agent02', 'agent02');

-- --------------------------------------------------------

--
-- Table structure for table `login_doctors`
--

CREATE TABLE `login_doctors` (
  `login_id` int(11) NOT NULL,
  `doctors_id` int(11) NOT NULL,
  `login` varchar(20) COLLATE utf8_czech_ci NOT NULL,
  `password` varchar(20) COLLATE utf8_czech_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

--
-- Dumping data for table `login_doctors`
--

INSERT INTO `login_doctors` (`login_id`, `doctors_id`, `login`, `password`) VALUES
(1, 1, 'lekar01', 'lekar01'),
(2, 2, 'lekar02', 'lekar02');

-- --------------------------------------------------------

--
-- Table structure for table `login_pacients`
--

CREATE TABLE `login_pacients` (
  `login_id` int(11) NOT NULL,
  `pacient_id` int(11) NOT NULL,
  `login` varchar(20) COLLATE utf8_czech_ci NOT NULL,
  `password` varchar(20) COLLATE utf8_czech_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

--
-- Dumping data for table `login_pacients`
--

INSERT INTO `login_pacients` (`login_id`, `pacient_id`, `login`, `password`) VALUES
(1, 1, 'pacient01', 'pacient01'),
(2, 2, 'pacient02', 'pacient02');

-- --------------------------------------------------------

--
-- Table structure for table `meds_supplies`
--

CREATE TABLE `meds_supplies` (
  `id_meds` int(11) NOT NULL,
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
-- Table structure for table `pacients`
--

CREATE TABLE `pacients` (
  `id_pacients` int(11) NOT NULL,
  `first_name` varchar(55) COLLATE utf8_czech_ci NOT NULL,
  `last_name` varchar(55) COLLATE utf8_czech_ci NOT NULL,
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
  `physician` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

--
-- Dumping data for table `pacients`
--

INSERT INTO `pacients` (`id_pacients`, `first_name`, `last_name`, `allergies`, `health_issue`, `health_description`, `state`, `accepted`, `released`, `ordered_since`, `ordered_until`, `practitioner`, `insurance_agent`, `physician`) VALUES
(1, 'Jiří', 'Krejčí', 'Prach', 'Zápal plic', 'Potíže s dýcháním.', 'čeká na vyšetření', '2020-12-01', NULL, '2020-12-02 12:00:00', '2020-12-02 12:20:00', 1, 1, 1),
(2, 'Marie', 'Dvořáková', NULL, 'Angína', 'Podrážděný hrtan.', 'Ukončen', '2020-11-20', '2020-12-01', NULL, NULL, 1, 2, 2),
(3, 'Petr', 'Krejčí', 'Pyl', 'Epilepsie', 'Časté malé záchvaty. ', 'čeká na vyšetření', '2020-10-01', NULL, '2021-02-26 10:00:00', '2021-02-26 10:30:00', 1, 1, 3);

-- --------------------------------------------------------

--
-- Table structure for table `pacients_meds`
--

CREATE TABLE `pacients_meds` (
  `id_pacients` int(11) DEFAULT NULL,
  `id_meds` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

--
-- Dumping data for table `pacients_meds`
--

INSERT INTO `pacients_meds` (`id_pacients`, `id_meds`) VALUES
(1, 9),
(3, 3),
(3, 10);

-- --------------------------------------------------------

--
-- Stand-in structure for view `pacient_view`
-- (See below for the actual view)
--
CREATE TABLE `pacient_view` (
`PacientID` int(11)
,`pacient_first_name` varchar(55)
,`pacient_last_name` varchar(55)
,`allergies` varchar(200)
,`health_issue` varchar(200)
,`health_description` varchar(500)
,`state` varchar(50)
,`ordered_since` datetime
,`ordered_until` datetime
,`practitioner` int(11)
,`agent_name` varchar(55)
,`insurance_agency_number` int(10)
,`physician_name` varchar(55)
);

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

-- --------------------------------------------------------

--
-- Structure for view `doctor_view`
--
DROP TABLE IF EXISTS `doctor_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `doctor_view`  AS  select `d`.`id_doctors` AS `DoctorID`,`d`.`first_name` AS `first_name`,`d`.`last_name` AS `last_name`,`h`.`since` AS `works_since`,`h`.`until` AS `works_until`,`de`.`name` AS `workplace`,count(`p`.`physician`) AS `number_of_pacients` from (((`doctors` `d` join `hours` `h` on((`d`.`work_hours` = `h`.`id_hours`))) join `department` `de` on((`d`.`department_number` = `de`.`id_department`))) join `pacients` `p` on((`d`.`id_doctors` = `p`.`physician`))) group by `d`.`last_name`,`p`.`physician` order by `d`.`id_doctors` ;

-- --------------------------------------------------------

--
-- Structure for view `pacient_view`
--
DROP TABLE IF EXISTS `pacient_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `pacient_view`  AS  select `p`.`id_pacients` AS `PacientID`,`p`.`first_name` AS `pacient_first_name`,`p`.`last_name` AS `pacient_last_name`,`p`.`allergies` AS `allergies`,`p`.`health_issue` AS `health_issue`,`p`.`health_description` AS `health_description`,`p`.`state` AS `state`,`p`.`ordered_since` AS `ordered_since`,`p`.`ordered_until` AS `ordered_until`,`p`.`practitioner` AS `practitioner`,`a`.`last_name` AS `agent_name`,`a`.`insurance_company_number` AS `insurance_agency_number`,`d`.`last_name` AS `physician_name` from ((`pacients` `p` join `agent` `a` on((`p`.`insurance_agent` = `a`.`id_agent`))) join `doctors` `d` on((`p`.`physician` = `d`.`id_doctors`))) order by `p`.`id_pacients` ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD UNIQUE KEY `id` (`id_admin`);

--
-- Indexes for table `agent`
--
ALTER TABLE `agent`
  ADD UNIQUE KEY `id` (`id_agent`);

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
  ADD KEY `foreign_id2` (`department_number`) USING BTREE;

--
-- Indexes for table `hours`
--
ALTER TABLE `hours`
  ADD UNIQUE KEY `id` (`id_hours`);

--
-- Indexes for table `login_admins`
--
ALTER TABLE `login_admins`
  ADD PRIMARY KEY (`login_id`),
  ADD UNIQUE KEY `foreign_id` (`admin_id`);

--
-- Indexes for table `login_agent`
--
ALTER TABLE `login_agent`
  ADD PRIMARY KEY (`login_id`),
  ADD UNIQUE KEY `foreign_id` (`agent_id`);

--
-- Indexes for table `login_doctors`
--
ALTER TABLE `login_doctors`
  ADD PRIMARY KEY (`login_id`),
  ADD UNIQUE KEY `foreign_id` (`doctors_id`);

--
-- Indexes for table `login_pacients`
--
ALTER TABLE `login_pacients`
  ADD PRIMARY KEY (`login_id`),
  ADD UNIQUE KEY `foreign_id` (`pacient_id`);

--
-- Indexes for table `meds_supplies`
--
ALTER TABLE `meds_supplies`
  ADD UNIQUE KEY `id` (`id_meds`);

--
-- Indexes for table `pacients`
--
ALTER TABLE `pacients`
  ADD UNIQUE KEY `id` (`id_pacients`),
  ADD KEY `foreign_id` (`insurance_agent`),
  ADD KEY `foreign_id2` (`physician`),
  ADD KEY `foreign_id3` (`practitioner`);

--
-- Indexes for table `pacients_meds`
--
ALTER TABLE `pacients_meds`
  ADD KEY `pacient_id` (`id_pacients`),
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
  MODIFY `id_admin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `agent`
--
ALTER TABLE `agent`
  MODIFY `id_agent` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `department`
--
ALTER TABLE `department`
  MODIFY `id_department` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `doctors`
--
ALTER TABLE `doctors`
  MODIFY `id_doctors` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `hours`
--
ALTER TABLE `hours`
  MODIFY `id_hours` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `login_admins`
--
ALTER TABLE `login_admins`
  MODIFY `login_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `login_agent`
--
ALTER TABLE `login_agent`
  MODIFY `login_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `login_doctors`
--
ALTER TABLE `login_doctors`
  MODIFY `login_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `login_pacients`
--
ALTER TABLE `login_pacients`
  MODIFY `login_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `meds_supplies`
--
ALTER TABLE `meds_supplies`
  MODIFY `id_meds` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `pacients`
--
ALTER TABLE `pacients`
  MODIFY `id_pacients` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `practitioners`
--
ALTER TABLE `practitioners`
  MODIFY `id_practioners` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `us_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `doctors`
--
ALTER TABLE `doctors`
  ADD CONSTRAINT `doctors_ibfk_1` FOREIGN KEY (`work_hours`) REFERENCES `hours` (`id_hours`) ON DELETE CASCADE,
  ADD CONSTRAINT `doctors_ibfk_2` FOREIGN KEY (`department_number`) REFERENCES `department` (`id_department`) ON DELETE CASCADE;

--
-- Constraints for table `login_admins`
--
ALTER TABLE `login_admins`
  ADD CONSTRAINT `login_admins_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`id_admin`) ON DELETE CASCADE;

--
-- Constraints for table `login_agent`
--
ALTER TABLE `login_agent`
  ADD CONSTRAINT `login_agent_ibfk_1` FOREIGN KEY (`agent_id`) REFERENCES `agent` (`id_agent`) ON DELETE CASCADE;

--
-- Constraints for table `login_doctors`
--
ALTER TABLE `login_doctors`
  ADD CONSTRAINT `login_doctors_ibfk_1` FOREIGN KEY (`doctors_id`) REFERENCES `doctors` (`id_doctors`) ON DELETE CASCADE;

--
-- Constraints for table `login_pacients`
--
ALTER TABLE `login_pacients`
  ADD CONSTRAINT `login_pacients_ibfk_1` FOREIGN KEY (`pacient_id`) REFERENCES `pacients` (`id_pacients`) ON DELETE CASCADE;

--
-- Constraints for table `pacients`
--
ALTER TABLE `pacients`
  ADD CONSTRAINT `pacients_ibfk_1` FOREIGN KEY (`physician`) REFERENCES `doctors` (`id_doctors`) ON DELETE CASCADE,
  ADD CONSTRAINT `pacients_ibfk_2` FOREIGN KEY (`insurance_agent`) REFERENCES `agent` (`id_agent`) ON DELETE CASCADE,
  ADD CONSTRAINT `pacients_ibfk_3` FOREIGN KEY (`practitioner`) REFERENCES `practitioners` (`id_practioners`) ON DELETE CASCADE;

--
-- Constraints for table `pacients_meds`
--
ALTER TABLE `pacients_meds`
  ADD CONSTRAINT `pacients_meds_ibfk_1` FOREIGN KEY (`id_pacients`) REFERENCES `pacients` (`id_pacients`) ON DELETE CASCADE,
  ADD CONSTRAINT `pacients_meds_ibfk_2` FOREIGN KEY (`id_meds`) REFERENCES `meds_supplies` (`id_meds`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
