const express = require('express');
const request = require('request');
const axios = require('axios');
const config = require('./config');


const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Welcome to the Interactive Weather Data Visualization!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const apiKey = config.apiKey;

async function fetchWeatherData(lat, lon, exclude = 'minutely,alerts') {
  const apiKey = config.apiKey;
  const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=${exclude}&appid=${apiKey}`;

  try {
    const response = await axios.get(url);
    const weatherData = response.data;
    console.log(weatherData);
    return weatherData;
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

fetchWeatherData(34.23, -118.52);
