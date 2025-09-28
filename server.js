const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "microclimate"
});

db.connect(err => {
  if (err) {
    console.error("DB connection failed:", err);
    return;
  }
  console.log("Connected to MySQL database.");
});

// ✅ GET weather data from OpenWeatherMap
app.get("/api/weather", async (req, res) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ message: "Latitude and Longitude are required" });
  }

  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    const response = await axios.get(url);
    const weather = response.data;

    const result = {
      city: weather.name,
      temperature: weather.main.temp,
      feels_like: weather.main.feels_like,
      humidity: weather.main.humidity,
      description: weather.weather[0].description,
      icon: weather.weather[0].icon
    };

    res.json(result);
  } catch (error) {
    console.error("Weather fetch error:", error.message);
    res.status(500).json({ message: "Failed to fetch weather data" });
  }
});

// ✅ POST weather data to DB
app.post("/api/weather", (req, res) => {
  const { city, temperature, feels_like, humidity, description } = req.body;
  const timestamp = new Date();

  const sql = `
    INSERT INTO weather_data (city, temperature, feels_like, humidity, description, timestamp)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [city, temperature, feels_like, humidity, description, timestamp], (err, result) => {
    if (err) {
      console.error("Insert error:", err);
      res.status(500).json({ message: "Failed to store weather data." });
    } else {
      res.json({ message: "Weather data stored successfully." });
    }
  });
});

// ✅ GET last 20 records from DB
app.get("/api/weather/history", (req, res) => {
  const sql = "SELECT * FROM weather_data ORDER BY timestamp DESC LIMIT 20";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Fetch error:", err);
      res.status(500).json({ message: "Failed to fetch history." });
    } else {
      res.json(results);
    }
  });
});

// ✅ POST crop suggestion based on temp + humidity
app.post("/api/crop-suggestion", (req, res) => {
  const { temperature, humidity } = req.body;

  const sql = `
    SELECT crop_name FROM crop_rules 
    WHERE ? BETWEEN min_temp AND max_temp
    AND ? BETWEEN min_humidity AND max_humidity
    LIMIT 1
  `;

  db.query(sql, [temperature, humidity], (err, results) => {
    if (err) {
      console.error("Error fetching crop suggestion:", err);
      res.status(500).json({ message: "Failed to fetch crop suggestion." });
    } else {
      if (results.length > 0) {
        res.json({ crop: results[0].crop_name });
      } else {
        res.json({ crop: "No suitable crop found" });
      }
    }
  });
});

// ✅ Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});






