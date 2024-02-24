
/* 

This is the hub of the server - all endpoint request will route through here. 

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

// Handles POST request to the /api endpoint
app.post('/api', (req, res) => {
  const recievedData = req.body;
  // Ensure button information was correct
  console.log("Recieved: " + recievedData.mediaType);

  // Send message back to React page
  res.json({message: "Data Recieved"});
});

// Handles GET request to the API endpoint
app.get('/api', (req, res) => {
  res.send('This is the API endpoint');
});


// Ensure server is running and endpoint is working
app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});
