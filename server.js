'use strict';

// REQUIRE - import for backend
const express = require('express');
require('dotenv').config();
const cors = require('cors');
let weatherData = require('./data/weather.json');

// EXPRESS - need to call Express to create the server (app === server)
const app = express();

// MIDDLEWARE - allow anyone to hit our server
app.use(cors());

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => console.log(`Woohoos! we are up on port ${PORT}`));



// ENDPOINTS
//         (1st arg - endpoint url, 2nd arg - callback which will execute when that endpoint is hit)
//                => 2 parameters: request, response
app.get('/', (request, response)=>{
  response.status(200).send('Welcome to my City Explorer server!');
});

// Weather Endpoint
app.get('/weather', (request, response, next)=>{

  try {
    // let lat = request.query.lat;
    // let lon = request.query.lon;
    let searchQuery = request.query.searchQuery;

    let foundCityWeather = weatherData.find(city => city.city_name === searchQuery);
    let forecast = new Forecast();
    let forecastArr = forecast.getForecast(foundCityWeather);

    console.log(request.query);

    response.status(200).send(forecastArr);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
});

// Forecast Class - Using a class with an object constructor to create a simpler object
class Forecast {
  constructor(){}
  getForecast(forecastArr) {
    let simpleForecastArr = [];
    for (let i = 0; i < forecastArr.data.length; i++) {
      let forecastObj = {
        date: forecastArr.data[i].valid_date,
        description: `Low of ${forecastArr.data[i].low_temp} degrees Celsius, high of ${forecastArr.data[i].high_temp} degrees Celsius with ${forecastArr.data[i].weather.description}`
      };
      simpleForecastArr.push(forecastObj);
    }
    return simpleForecastArr;
  }
}

let forecast = new Forecast();
let forecastArr = forecast.getForecast(weatherData[0]);
console.log(forecastArr);



// CATCH ALL ENDPOINT - should be the very last endpoint defined
app.get('*', (request,response) =>{
  response.status(404).send('This page does not exist');
});

// ERROR HANDLING - Plug and play code from Express Docs
app.use((error, request, response, next) => {
  console.log(error.message);
  response.status(500).send(error.message);
});
