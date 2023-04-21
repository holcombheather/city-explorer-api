'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
let weatherData = require('./data/weather.json');
// const axios = require('axios');

const app = express();

app.use(cors());

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => console.log(`Woohoos! we are up on port ${PORT}`));


app.get('/', (request, response)=>{
  response.status(200).send('Welcome to my City Explorer server!');
});

app.get('/weather', (request, response, next)=>{
  console.log('Weather endpoint hit');
  console.log('All weather data: ', weatherData);

  try {
    let lat = request.query.lat;
    let lon = request.query.lon;
    // let searchQuery = request.query.searchQuery;


    // TODO: ERROR MESSAGE

    let foundCityWeather = weatherData.find(city => city.city_name === searchQuery);

    console.log('foundCityWeather:', foundCityWeather);

    let forecasts = foundCityWeather.data.map(weatherData => new Forecast(weatherData));


    response.status(200).send(forecasts);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
});

class Forecast {
  constructor(forecastObj){
    this.date = forecastObj.valid_date;
    this.description = forecastObj.weather.description;
  }
}

// getForecast(forecastObj) {
//   let formattedForecast = [];
//   for (let i = 0; i < forecastObj.length; i++) {
//     let forecastArr = {
//       date: forecastObj[i].valid_date,
//       description: `Low of ${forecastObj.data[i].low_temp} degrees Celsius, high of ${forecastObj.data[i].high_temp} degrees Celsius with ${forecastObj.data[i].weather.description}`
//     };
//     formattedForecast.push(forecastArr);
//   }
//   return formattedForecast;
// }

// TODO: BUILD AN ENDPOINT THAT WILL CALL OUT TO AN API
// app.get('/photos', getPhotos);

// async function getPhotos (request, response, next) {
//   try {
//     let myLocalCity = request.query.city;

//     let url=`https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_API_KEY}&query=${myLocalCity}`;

//     let photosFromAxios = await axios.get(url);

//     let dataToSend = photosFromAxios.data.results.map(obj => new Photo(obj));

//     response.status(200).send(dataToSend);
//   } catch (error) {
//     next(error);
//   }
// }

// class Photo {
//   constructor(picObj){
//     this.src = picObj.urls.regular;
//     this.alt = picObj.alt_description;
//     this.username = picObj.user.name;
//   }
// }


app.get('*', (request,response) =>{
  response.status(404).send('This page does not exist');
});

app.use((error, request, response, next) => {
  console.log(error.message);
  response.status(500).send(error.message);
});
