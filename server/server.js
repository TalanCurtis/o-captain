require('dotenv').config();
const express = require('express');
const cors = require('cors');
const massive = require('massive');
const app = express();

// destructure env file
const {SERVER_PORT} = process.env;

// import middleware
const bodyParser=require('body-parser');

// Top level middleware
app.use(bodyParser.json())

// Controller Imports
const test_controller = require('./controllers/test_controller')

// Endpoints
//// test endpoint
app.get('/api/test', test_controller.testGet)

// Run Server
app.listen(SERVER_PORT, ()=>(console.log(`Sailing on port: ${SERVER_PORT}`)))

