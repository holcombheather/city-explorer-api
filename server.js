'use strict';


// *** REQUIRE ** (like import for the backend)

const express = require('express');
require('dotenv').config();
const cors = require('cors');
let petData = require('./data/data.json');

// *** app === server - Need to call Express to create the server
const app = express();

// *** MIDDLEWARE *** allow anyone to hit our server
app.use(cors());

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => console.log(`Yay we are up on port ${PORT}`));

// *** ENDPOINTS ***
// *** 1st arg - endpoint url
// *** 2nd arg - callback which will execute when that endpoint is hit
//                ** 2 parameters, request, response
app.get('/', (request, response)=>{
  response.status(200).send('Welcome to my server!');
});

app.get('/hello', (request, response)=>{
  let firstName = request.query.firstName;
  let lastName = request.query.lastName;

  console.log(request.query);

  response.status(200).send(`Hello ${firstName} ${lastName}, welcome to my server!`);

});

//TODO: update query for weather task
app.get('/weather', (request, response, next)=>{

  try {
    let queriedSpecies = request.query.species;

    let foundPet = petData.find(pet => pet.species === queriedSpecies);
    let dataToSend = new Pet(foundPet);

    response.status(200).send(dataToSend);
  } catch (error) {
    next(error);
  }
});

// *** CLASS TO GROOM BULKY DATA *** Using a class with an object constructor to create a simpler object
class Pet {
  constructor(petObj){
    this.name = petObj.name;
    this.breed = petObj.breed;
  }
}

app.get('/search', (request, response)=>{
  let userAPIKey = request.query.key;
  let locationQuery = request.query.q;

  console.log(request.query);

  response.status(200).send(`Hello ${firstName} ${lastName}, welcome to my server!`);

});


// *** CATCH ALL ENDPOINT - shoudl be the very last endpoint defined ***
app.get('*', (request,response) =>{
  response.status(404).send('This page does not exist');
});

// *** ERROR HANDLING - Plug and play code from Express Docs ***
app.use((error, request, response, next) => {
  console.log(error.message);
  response.status(500).send(error.message);
});
