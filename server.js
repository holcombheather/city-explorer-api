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

app.listen(PORT, () => console.log(`Woohoo! we are up on port ${PORT}`));



// ENDPOINTS
//         (1st arg - endpoint url, 2nd arg - callback which will execute when that endpoint is hit)
//                => 2 parameters: request, response
app.get('/', (request, response)=>{
  response.status(200).send('Welcome to my City Explorer server!');
});

// Weather Endpoint
app.get('/weather', (request, response, next)=>{

  try {

    let queriedWeather = request.query.city_name;

    let foundCityWeather = weatherData.find(city => city.city_name === queriedWeather);
    let dataToSend = new Forecast(foundCityWeather);

    response.status(200).send(dataToSend);
  } catch (error) {
    next(error);
  }
});

// Forecast Class - Using a class with an object constructor to create a simpler object
class Forecast {
  constructor(forecastObj){
    this.date = forecastObj.valid_date;
    this.description = forecastObj.weather.description;
  }
}





app.get('/search', (request, response)=>{
  let userAPIKey = request.query.key;
  let locationQuery = request.query.q;

  console.log(request.query);

  response.status(200).send(`Hello ${firstName} ${lastName}, welcome to my server!`);

});


// CATCH ALL ENDPOINT - should be the very last endpoint defined
app.get('*', (request,response) =>{
  response.status(404).send('This page does not exist');
});

// ERROR HANDLING - Plug and play code from Express Docs
app.use((error, request, response, next) => {
  console.log(error.message);
  response.status(500).send(error.message);
});
