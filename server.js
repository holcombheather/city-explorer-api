'use strict';


// *** REQUIRE ** (like import for the backend)

const express = require('express');
require('dotenv').config();
const cors = require('cors');

// ** app === server - Need to call Express to create the server
const app = express();