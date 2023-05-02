// 'use strict';

// const axios = require('axios');
// const { cacheData } = require('../cache');

// class Movie {
//   constructor(movieObj) {
//     this.id = movieObj.id;
//     this.title = movieObj.title;
//     this.overview = movieObj.overview;
//     this.imgUrl = movieObj.poster_path;
//   }
// }

// const getMovies = async (request, response, next) => {
//   try {
//     const city = request.query.city;
//     const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&query=${city}`;

//     const key = `moviedb-key-${city}`;

//     await cacheData(response, key, url, 'results', Movie, 7);
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports = getMovies;



'use strict';

const axios = require('axios');

class Movie {
  constructor(movieObj){
    this.id = movieObj.id;
    this.title = movieObj.title;
    this.overview = movieObj.overview;
    this.imgUrl = movieObj.poster_path;
  }
}

const getMovies = async (request, response, next) => {
  try {
    const city = request.query.city;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&query=${city}`;

    const moviesFromAxios = await axios.get(url);

    const moviesToSend = moviesFromAxios.data.results.map((obj) => new Movie(obj));

    response.status(200).send(moviesToSend);
  } catch (error) {
    next(error);
  }


};

module.exports = getMovies;
