-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 21, 2023 at 12:06 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `epitaka-db`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `Account_ID` int(11) NOT NULL,
  `Username` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Balance` decimal(10,2) NOT NULL DEFAULT 0.00,
  `Email` varchar(255) DEFAULT NULL,
  `FName` varchar(255) NOT NULL,
  `LName` varchar(255) NOT NULL,
  `User_type` varchar(255) NOT NULL DEFAULT 'regular'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`Account_ID`, `Username`, `Password`, `Balance`, `Email`, `FName`, `LName`, `User_type`) VALUES
(1008, 'marbs', '$2b$10$l6l2SGC4rIhbnCBMyxyJhe4jje0AbwgE1OhrGHno92GrQUKJVv8Ka', '5413.00', '20103337@usc.edu.ph', 'Jasper Lee', 'Marbella', 'regular'),
(1009, 'admin', '$2b$10$7NdWqvN4EzaKFp6ovwhTNOX4RX4ThSHzxc6IafregJCZDUUKl1mfG', '0.00', 'admin@gmail.com', 'admin', 'user', 'admin'),
(1010, 'Burp', '$2b$10$lnac.ulLHP2jeHQWIdSoiOUo8vTxRz2nMol2EbiGwq9nGwLroUNvS', '0.00', 'burp@gmail.com', 'Burp', 'Eatery', 'regular'),
(1011, 'ross', '$2b$10$r7pXn21tH5aoQez1d7oN.uN6BXJ1nc1Qcc9YXNpggv3r9xLx3kF8a', '544.00', '22100028@usc.edu.ph', 'Reece Sergei', 'Lim', 'regular'),
(1012, 's1mple', '$2b$10$RS1nsMzv.ND9ZdwsBl6j5uGdlZcvLOwr7Qb/YURLawdGfZtHUqkCe', '0.00', 's1mple@gmail.com', 'Oleksandr', 'Kostyliev', 'regular'),
(1043, 'qwe', '$2b$10$ZovExaYy7lddwyIHSoRIv.1Wtiu8dB1Njv6964dlDFpgWMyM9Dwh.', '0.00', 'qwe@qwe', 'ewq', 'ewq', 'regular'),
(1047, 'dpswh', '$2b$10$GvjGFesOKEiVIaVyRbQStuqlmVOV1jp2EqGoDH1cRiAbrXu.ozE1a', '95.00', '22103514@usc.edu.ph', 'Achille Lorenzo', 'Lanutan', 'regular');

-- --------------------------------------------------------

--
-- Table structure for table `admin_transaction`
--

CREATE TABLE `admin_transaction` (
  `aTransaction_ID` int(11) NOT NULL,
  `Amount` decimal(10,2) NOT NULL,
  `Date` timestamp NOT NULL DEFAULT current_timestamp(),
  `aTransaction_type` varchar(255) DEFAULT NULL,
  `Account_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin_transaction`
--

INSERT INTO `admin_transaction` (`aTransaction_ID`, `Amount`, `Date`, `aTransaction_type`, `Account_ID`) VALUES
(1000001, '5000.00', '2023-12-08 13:19:32', 'deposit', 1008),
(1000002, '200.00', '2023-12-08 13:21:29', 'deposit', 1008),
(1000003, '400.00', '2023-12-08 14:13:16', 'deposit', 1008),
(1000004, '5.00', '2023-12-08 23:24:28', 'deposit', 1043),
(1000005, '100.00', '2023-12-08 23:50:18', 'deposit', 1008),
(1000006, '40.00', '2023-12-09 00:19:03', 'deposit', 1008),
(1000007, '10.00', '2023-12-09 00:19:55', 'deposit', 1008),
(1000008, '30.00', '2023-12-09 00:20:14', 'deposit', 1008),
(1000009, '10.00', '2023-12-09 00:21:03', 'deposit', 1008),
(1000010, '40.00', '2023-12-09 00:26:20', 'deposit', 1008),
(1000011, '90.00', '2023-12-09 00:28:22', 'deposit', 1008),
(1000012, '127.00', '2023-12-09 00:28:56', 'deposit', 1008);

-- --------------------------------------------------------

--
-- Table structure for table `summary`
--

CREATE TABLE `summary` (
  `Summary_ID` int(11) NOT NULL,
  `Month` date NOT NULL,
  `Init_Value` decimal(10,2) NOT NULL,
  `End_Value` decimal(10,2) NOT NULL,
  `Account_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `summary`
--

INSERT INTO `summary` (`Summary_ID`, `Month`, `Init_Value`, `End_Value`, `Account_ID`) VALUES
(4, '2023-12-05', '100.00', '544.00', 1011),
(5, '2023-12-06', '5.00', '0.00', 1043),
(6, '2023-04-06', '4969.00', '5001.00', 1008),
(7, '2023-05-06', '5001.00', '5101.00', 1008),
(8, '2023-06-06', '5101.00', '5051.00', 1008),
(9, '2023-07-06', '5051.00', '5121.00', 1008),
(10, '2023-08-06', '5121.00', '5131.00', 1008),
(15, '2023-09-06', '5251.00', '5291.00', 1008),
(16, '2023-10-06', '5291.00', '5381.00', 1008),
(17, '2023-11-06', '5381.00', '5508.00', 1008),
(18, '2023-12-01', '5508.00', '5413.00', 1008),
(19, '2023-12-01', '0.00', '95.00', 1047);

-- --------------------------------------------------------

--
-- Table structure for table `user_transaction`
--

CREATE TABLE `user_transaction` (
  `uTransaction_ID` int(11) NOT NULL,
  `Sender_ID` int(11) DEFAULT NULL,
  `Receiver_ID` int(11) DEFAULT NULL,
  `Amount` decimal(10,2) NOT NULL,
  `Date` timestamp NOT NULL DEFAULT current_timestamp(),
  `Note` varchar(300) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_transaction`
--

INSERT INTO `user_transaction` (`uTransaction_ID`, `Sender_ID`, `Receiver_ID`, `Amount`, `Date`, `Note`) VALUES
(5000013, 1008, 1011, '100.00', '2023-12-08 13:20:38', 'i love you ross'),
(5000014, 1008, 1011, '100.00', '2023-12-08 13:27:44', 'ross is my king'),
(5000015, 1008, 1011, '500.00', '2023-12-08 13:30:30', 'i love you ross pls notice me'),
(5000016, 1011, 1008, '1.00', '2023-12-08 13:31:49', 'stop sending me money!'),
(5000017, 1043, 1011, '5.00', '2023-12-08 23:24:53', 'test'),
(5000018, 1011, 1008, '100.00', '2023-12-08 23:51:42', 'this is my payment'),
(5000019, 1008, 1011, '50.00', '2023-12-08 23:52:50', 'you paid too much!'),
(5000020, 1011, 1008, '50.00', '2023-12-08 23:53:35', 'nah, this is enough'),
(5000021, 1011, 1008, '20.00', '2023-12-08 23:55:24', 'this is more'),
(5000022, 1011, 1008, '10.00', '2023-12-08 23:57:03', ''),
(5000023, 1011, 1008, '10.00', '2023-12-09 00:00:04', 'yes'),
(5000024, 1011, 1008, '20.00', '2023-12-09 00:01:34', ''),
(5000025, 1008, 1047, '100.00', '2023-12-11 04:07:38', 'achille yes'),
(5000026, 1047, 1008, '5.00', '2023-12-11 04:08:23', 'noob');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`Account_ID`);

--
-- Indexes for table `admin_transaction`
--
ALTER TABLE `admin_transaction`
  ADD PRIMARY KEY (`aTransaction_ID`),
  ADD KEY `Account_ID` (`Account_ID`);

--
-- Indexes for table `summary`
--
ALTER TABLE `summary`
  ADD PRIMARY KEY (`Summary_ID`),
  ADD KEY `Account_ID` (`Account_ID`);

--
-- Indexes for table `user_transaction`
--
ALTER TABLE `user_transaction`
  ADD PRIMARY KEY (`uTransaction_ID`),
  ADD KEY `fk_sender_user` (`Sender_ID`),
  ADD KEY `fk_receiver_user` (`Receiver_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account`
--
ALTER TABLE `account`
  MODIFY `Account_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1048;

--
-- AUTO_INCREMENT for table `admin_transaction`
--
ALTER TABLE `admin_transaction`
  MODIFY `aTransaction_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1000013;

--
-- AUTO_INCREMENT for table `summary`
--
ALTER TABLE `summary`
  MODIFY `Summary_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `user_transaction`
--
ALTER TABLE `user_transaction`
  MODIFY `uTransaction_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5000027;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admin_transaction`
--
ALTER TABLE `admin_transaction`
  ADD CONSTRAINT `fk_account_user` FOREIGN KEY (`Account_ID`) REFERENCES `account` (`Account_ID`) ON UPDATE CASCADE;

--
-- Constraints for table `summary`
--
ALTER TABLE `summary`
  ADD CONSTRAINT `fk_account_summary` FOREIGN KEY (`Account_ID`) REFERENCES `account` (`Account_ID`);

--
-- Constraints for table `user_transaction`
--
ALTER TABLE `user_transaction`
  ADD CONSTRAINT `fk_receiver_user` FOREIGN KEY (`Receiver_ID`) REFERENCES `account` (`Account_ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_sender_user` FOREIGN KEY (`Sender_ID`) REFERENCES `account` (`Account_ID`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
