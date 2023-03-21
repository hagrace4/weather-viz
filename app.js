const express = require('express');
const request = require('request');
const config = require('./config');


const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Welcome to the Interactive Weather Data Visualization!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


// Replace YOUR_API_KEY with the API key you obtained from OpenWeatherMap
const apiKey = config.apiKey;

app.get('/weather/:city', (req, res) => {
  const city = req.params.city;
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  request(url, (error, response, body) => {
    if (error) {
      res.status(500).send('Error fetching weather data');
    } else {
      const weatherData = JSON.parse(body);
      res.send(weatherData);
    }
  });
});
