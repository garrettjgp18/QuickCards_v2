
/*
  This file contains the main logic of NodeJS, including the routes and POST / GET fetch request processing. 
*/


const http = require('node:http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')


// Define port
const hostname = '127.0.0.1';
const port = 3000;


// Don't worry about these
app.use(bodyParser.json());
app.use(cors());


// ROUTES / ENDPOINTS --------------------------------------------


// Handles POST request to the /api endpoint
app.post('/api', (req, res) => {
  const recievedData = req.body;
  // Format data and display in terminal running NodeJS to ensure data is correct
  console.log(`Recieved from React:\n Media Type: ${recievedData.mediaType}\n Number of Cards = ${recievedData.numberOfCards}\n Schema: ${recievedData.currentSchema}`);


  // Send message back to React page (line 53 + 54 from CreatePage.jsx)
  res.json({message: "Data Recieved from NodeJS"});
});


// Handles GET request to the API endpoint
// Mainly just so error page goes away
app.get('/api', (req, res) => {
  res.send(' Hello :) ');
});


// CREATE -------------------------------------------------------


// Ensure server is running and endpoint is working
app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/api`);
});
