'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
// let weatherData = require('./data/weather.json');
const axios = require('axios');
const getWeather = require('./modules/weather');

const app = express();

app.use(cors());

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`You did it! We are up on port ${PORT}`));


app.get('/', (request, response)=>{
  response.status(200).send('Welcome to my City Explorer server!');
});


app.get('/weather', getWeather);

// app.get('/weather', async (request, response, next)=>{

//   try {
//     // let searchQuery = request.query.searchQuery;
//     let lat = request.query.lat;
//     let lon = request.query.lon;

//     let url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.REACT_APP_WEATHERBIT_API_KEY}&lat=${lat}&lon=${lon}`;

//     // let foundCityWeather = weatherData.find(city => city.city_name === searchQuery);
//     let foundCityWeather= await axios.get(url);

//     console.log('foundCityWeather:', foundCityWeather);

//     // let forecasts = foundCityWeather.data.map(weatherData => new Forecast(weatherData));
//     let forecasts = foundCityWeather.data.data.map(obj => new Forecast(obj));

//     response.status(200).send(forecasts);
//   } catch (error) {
//     console.log(error.message);
//     next(error);
//   }
// });

// class Forecast {
//   constructor(forecastObj){
//     this.date = forecastObj.valid_date;
//     this.description = forecastObj.weather.description;
//     this.low = forecastObj.low_temp;
//     this.high = forecastObj.high_temp;
//     this.temp = forecastObj.temp;
//   }
// }



app.get('/movies', async (request, response, next) => {
  try {
    let city = request.query.city;
    console.log(request.query);

    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&query=${city}`;

    let moviesFromAxios = await axios.get(url);

    let moviesToSend = moviesFromAxios.data.results.map(obj=> new Movie(obj));

    response.status(200).send(moviesToSend);
  } catch (error) {
    next(error);
  }
});

class Movie {
  constructor(movieObj){
    this.id = movieObj.id;
    this.title = movieObj.title;
    this.overview = movieObj.overview;
    this.imgUrl = movieObj.poster_path;
  }
}

app.get('/search', (req, res) => {
  let userApi = req.query.key;
  let locQry = req.query.q;

  console.log(req.query);

  res.status(200).send(`Hello ${userApi} ${locQry}! Welcome to my server`);
});

app.get('*', (request,response) =>{
  response.status(404).send('This page does not exist');
});

// eslint-disable-next-line no-unused-vars
app.use((error, request, response, next) => {
  console.log(error.stack);
  response.status(500).send('You broke it! ' + error.message);
});

