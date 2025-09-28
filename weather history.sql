-- 1. Create database if not exists
CREATE DATABASE IF NOT EXISTS microclimate;

-- 2. Use the database
USE microclimate;

-- 3. Create table: weather_data
CREATE TABLE IF NOT EXISTS weather_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    city VARCHAR(100) NOT NULL,
    temperature FLOAT NOT NULL,
    feels_like FLOAT NOT NULL,
    humidity INT NOT NULL,
    description VARCHAR(255),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Create table: crop_rules
CREATE TABLE IF NOT EXISTS crop_rules (
    id INT AUTO_INCREMENT PRIMARY KEY,
    min_temp FLOAT,
    max_temp FLOAT,
    min_humidity INT,
    max_humidity INT,
    crop_name VARCHAR(100)
);

-- 5. Insert crop rules
INSERT INTO crop_rules (min_temp, max_temp, min_humidity, max_humidity, crop_name) VALUES
(20, 30, 40, 70, 'Rice'),
(15, 25, 30, 60, 'Wheat'),
(25, 35, 50, 80, 'Maize'),
(18, 28, 45, 75, 'Barley'),
(22, 32, 60, 90, 'Sugarcane');

-- 6. View inserted data
SELECT * FROM weather_data;
SELECT * FROM crop_rules;

