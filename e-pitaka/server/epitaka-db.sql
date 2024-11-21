-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 03, 2023 at 09:53 AM
-- Server version: 8.0.33
-- PHP Version: 8.2.4

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
  `Account_ID` int NOT NULL,
  `Username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Balance` decimal(10,2) NOT NULL DEFAULT '0.00',
  `Email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `FName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `LName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Valid_ID` mediumblob,
  `Profile_pic` mediumblob,
  `User_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'regular'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`Account_ID`, `Username`, `Password`, `Balance`, `Email`, `FName`, `LName`, `Valid_ID`, `Profile_pic`, `User_type`) VALUES
(1, 'admin', 'admin', 0.00, NULL, 'admin', 'admin', NULL, NULL, 'admin'),
(2, 'Loading', 'asdasd', 42.12, NULL, 'Reece', 'Lim', NULL, NULL, 'regular'),
(3, 'asd', 'asd', 0.00, NULL, 'asd', 'asd', NULL, NULL, 'regular'),
(4, 'asda', 'asda', 0.00, NULL, 'asd', 'asd', NULL, NULL, 'regular');

-- --------------------------------------------------------

--
-- Table structure for table `user_transaction`
--

CREATE TABLE `user_transaction` (
  `uTransaction_ID` int NOT NULL,
  `Sender_ID` int NOT NULL,
  `Receiver_ID` int NOT NULL,
  `Amount` decimal(10,2) NOT NULL,
  `Date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `uTransaction_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_transaction`
--

INSERT INTO `user_transaction` (`uTransaction_ID`, `Sender_ID`, `Receiver_ID`, `Amount`, `Date`, `uTransaction_type`) VALUES
(1, 1, 2, 10.11, '2023-12-03 08:30:48', 'send'),
(5, 2, 3, 69.19, '2023-12-03 08:48:00', NULL),
(6, 1, 3, 1.19, '2023-12-03 08:52:43', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`Account_ID`);

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
  MODIFY `Account_ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `user_transaction`
--
ALTER TABLE `user_transaction`
  MODIFY `uTransaction_ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `user_transaction`
--
ALTER TABLE `user_transaction`
  ADD CONSTRAINT `fk_receiver_user` FOREIGN KEY (`Receiver_ID`) REFERENCES `account` (`Account_ID`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_sender_user` FOREIGN KEY (`Sender_ID`) REFERENCES `account` (`Account_ID`) ON DELETE RESTRICT ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
