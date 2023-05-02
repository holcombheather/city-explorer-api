'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
// const axios = require('axios');
// const { cacheData } = require('./cache');
const getWeather = require('./modules/weather');
const getMovies = require('./modules/movies');

const app = express();

app.use(cors());

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`You did it! We are up on port ${PORT}`));


app.get('/', (request, response)=>{
  response.status(200).send('Welcome to my City Explorer server!');
});


app.get('/weather', getWeather);

app.get('/movies', getMovies);

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

