'use strict';
const axios = require('axios');

let cache = {};

const cacheData = async (response, key, apiUrl, dataPath, Constructor, daysCached) => {
  const milliseconds = daysCached * 24 * 60 * 60 * 1000;

  if (cache[key] && (Date.now() - cache[key].timestamp) < milliseconds) {
    console.log('Cache hit', cache);
    const date = new Date(cache[key].timestamp);
    const formattedDate = date.toLocaleString();
    response.status(200).send([cache[key].data, formattedDate]);
  } else {
    console.log('Cache miss', cache);

    try {
      const dataFromApi = await axios.get(apiUrl);
      const dataToSend = dataFromApi.data[dataPath].map(obj => new Constructor(obj));

      cache[key] = {
        data: dataToSend,
        timestamp: Date.now(),
      };

      const date = new Date(cache[key].timestamp);
      const formattedDate = date.toLocaleString();

      response.status(200).send([cache[key].data, formattedDate]);
    } catch (error) {
      console.error('Error fetching data from API:', error);
      response.status(500).send('Error fetching data from API');
    }
  }
};

module.exports = { cacheData };
