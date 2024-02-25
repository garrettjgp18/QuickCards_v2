
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
  // Ensure button information was correct
  console.log(`Recieved from React:\n Media Type: ${recievedData.mediaType}\n Number of Cards = ${recievedData.numberOfCards}\n Schema: ${recievedData.currentSchema}`);


  // Send message back to React page
  res.json({message: "Data Recieved from NodeJS"});
});


// Handles GET request to the API endpoint
app.get('/api', (req, res) => {
  res.send('This is the API endpoint');
});


// CREATE -------------------------------------------------------


// Ensure server is running and endpoint is working
app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/api`);
});
