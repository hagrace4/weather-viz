const express = require('express');
const request = require('request');
const axios = require('axios');
const config = require('./config');


const app = express();
const port = process.env.PORT || 3000;

// server static files to public
app.use(express.static('public'));


app.get('/', (req, res) => {
  res.send('Welcome to the Interactive Weather Data Visualization!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const apiKey = config.apiKey;

async function fetchWeatherData(lat, lon, exclude = 'minutely,alerts') {
  const apiKey = config.apiKey;
  const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=${exclude}&appid=${apiKey}`;

  try {
    const response = await axios.get(url);
    const weatherData = response.data;
    console.log(weatherData);
    return weatherData;
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

// Route to handle API request for weather data
app.get('/api/weather-data/:lat/:lon', async (req, res) => {
  const lat = req.params.lat;
  const lon = req.params.lon;
  try {
    const weatherData = await fetchWeatherData(lat, lon);
    res.json(weatherData);
  } catch (error) {
    console.error('Erorr fetching weather data:', error);
    res.status(500).send('Error fetching weather data.');
  }
});



// fetchWeatherData(34.23, -118.52);
// http://localhost:3000/api/weather-data/34.23/-118.52

