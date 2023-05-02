'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
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


app.get('/movies', async (request, response, next) => {
  try {
    let city = request.query.city;
    console.log(request.query);

    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&query=${city}`;

    let moviesFromAxios = await axios.get(url);

    let moviesToSend = moviesFromAxios.data.results.map(obj=> new Movie(obj));
    console.log(moviesToSend[0]);

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

