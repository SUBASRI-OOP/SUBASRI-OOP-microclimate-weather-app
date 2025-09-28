# Microclimate Weather App 🌦️

This project shows **real-time weather**, stores history in MySQL, displays charts, and suggests crops based on temperature and humidity.  

---

## 🚀 How to Run

### 1️⃣ Clone this repo
```bash
git clone https://github.com/your-username/microclimate-weather-app.git
cd microclimate-weather-app
2️⃣ Setup MySQL Database

Open MySQL Workbench or phpMyAdmin.

Run the SQL commands from the database/weather_data.sql file:
⚠️ Important: Run these SQL commands before starting the backend.
If MySQL is not running or tables are missing, the app will not show weather data.

3️⃣ Start Backend Server

Open terminal in the backend folder:

cd weather-backend
npm install
node server.js


Confirm backend is running:

Connected to MySQL database.
Server running on port 3001


Make sure your .env file is set correctly:

DB_PASSWORD=root
DB_NAME=microclimate
OPENWEATHER_API_KEY=YOUR_API_KEY
PORT=3001

4️⃣ Open Frontend

Open weather-frontend/index.html in a browser.

Enter a city name and click Show Weather.

The app will:

Fetch weather from OpenWeatherMap

Store data in MySQL

Display last 20 records in a chart

Suggest crops based on temperature & humidity

Allow downloading a CSV weather report

5️⃣ Project Structure
microclimate-weather-app/
│
├── weather-frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── weather-backend/
│   ├── server.js
│   ├── package.json
│   └── .env
├── database/
│   └── weather_data.sql  <-- SQL commands for setup
└── README.md

⚠️ Key Notes

Always start MySQL first and import SQL before running the backend.

Backend must be running before opening the frontend UI, otherwise weather data will not display.

Weather data is automatically stored in MySQL.

CSV download is available for the last 20 records.


---

If you want, I can also **prepare the `weather_data.sql` file** with all your SQL commands ready to copy into the `database` folder, so anyone can import it in **one step**.  

Do you want me to do that?
