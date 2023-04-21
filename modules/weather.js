'use strict';

const axios = require('axios');




async function getWeather(request, response, next) {
  try {
    let lat = request.query.lat;
    let lon = request.query.lon;

    console.log(lat);
    console.log(lon);

    let url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHERBIT_API_KEY}&lat=${lat}&lon=${lon}`;
    // let url = `http://api.weatherbit.io/v2.0/forecast/daily?key=f744a68161be484bb6ab31a6e1b7be1d&lat=35.6812665&lon=139.757653`;


    let foundCityWeather = await axios.get(url);
    console.log('foundCityWeather:', foundCityWeather);

    let forecasts = foundCityWeather.data.data.map(obj => new Forecast(obj));

    response.status(200).send(forecasts);
    console.log(forecasts);

  } catch (error) {
    next(error);
    console.log(error.message);
  }
}


class Forecast {
  constructor(forecastObj){
    this.date = forecastObj.valid_date;
    this.description = forecastObj.weather.description;
    this.low = forecastObj.low_temp;
    this.high = forecastObj.high_temp;
    this.temp = forecastObj.temp;
  }
}

module.exports = getWeather;


