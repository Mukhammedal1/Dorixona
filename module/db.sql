-- Active: 1732787417659@@127.0.0.1@3306@dorixona
DROP DATABASE dorixona

CREATE DATABASE dorixona

use dorixona

CREATE TABLE `Pharmacies`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `location` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `region_id` BIGINT NOT NULL,
    `district_id` BIGINT NOT NULL
);



INSERT INTO `Pharmacies` (`name`, `address`, `location`, `phone`, `email`, `region_id`, `district_id`)
VALUES
('HealthPlus Pharmacy', '123 Main St', '41.311081, 69.240562', '+998901234567', 'healthplus@example.com', 1, 1),
('MediCare Pharmacy', '45 Liberty Ave', '40.986456, 70.355467', '+998902345678', 'medicare@example.com', 1, 2),
('GreenLife Pharmacy', '78 Sunrise Blvd', '41.556667, 69.199987', '+998903456789', 'greenlife@example.com', 2, 3),
('GoodHealth Pharmacy', '101 Wellness Rd', '40.991245, 71.554457', '+998904567890', 'goodhealth@example.com', 3, 4),
('CityCare Pharmacy', '50 Downtown Lane', '41.245675, 69.378912', '+998905678901', 'citycare@example.com', 5, 5)



CREATE TABLE `Medicines`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `manufacturer` VARCHAR(255) NOT NULL,
    `medicine_type_id` BIGINT NOT NULL,
    `price` FLOAT(53) NOT NULL,
    `expiry_date` DATE NOT NULL,
    `info` TEXT NOT NULL
);

INSERT INTO `Medicines` (`name`, `manufacturer`, `medicine_type_id`, `price`, `expiry_date`, `info`)
VALUES
('Paracetamol', 'PharmaCo Ltd', 4, 2.50, '2025-06-30', 'Pain reliever and fever reducer'),
('Ibuprofen', 'HealthGen Inc', 3, 3.00, '2024-12-31', 'Anti-inflammatory and pain reliever'),
('Amoxicillin', 'MedCare Pharma', 2, 4.00, '2025-05-20', 'Broad-spectrum antibiotic'),
('Acyclovir', 'ViroMed Labs', 5, 5.50, '2026-03-15', 'Used to treat viral infections'),
('Aspirin', 'Global Remedies', 1, 2.00, '2023-12-15', 'Relieves pain, fever, and inflammation')



CREATE TABLE `Stock`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `pharmacy_id` BIGINT NOT NULL,
    `medicine_id` BIGINT NOT NULL,
    `quantity` BIGINT NOT NULL
);

INSERT INTO `Stock` (`pharmacy_id`, `medicine_id`, `quantity`)
VALUES
(1, 1, 100), 
(1, 2, 50),  
(2, 3, 75), 
(3, 4, 30),  
(4, 5, 120)



CREATE TABLE `District`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `region_id` BIGINT NOT NULL
);

INSERT INTO `District` (`name`, `region_id`)
VALUES
('Yunusobod', 1), 
('Chilonzor', 1),
('Urganch', 2),  
('Ishtixon', 3),  
('Namangan sh.', 5)



CREATE TABLE `Region`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL
);

INSERT INTO `Region` (`name`)
VALUES
('Toshkent shahri'),
('Xorazm viloyati'),
('Samarqand viloyati'),
('Andijon viloyati'),
('Namangan viloyati')



CREATE TABLE `MedicineType`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL
);

INSERT INTO `MedicineType` (`name`)
VALUES
('Analgesic'),
('Antibiotic'),
('Anti-inflammatory'),
('Antipyretic'),
('Antiviral')




