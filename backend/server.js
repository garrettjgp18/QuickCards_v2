
/* 

This is the hub of the server - all endpoint request will route through here. 

When the frontend requires data, send a POST request to this file with an action parameter in the body,
call the apprropriate method, and send a return back to React (or something like that).


https://www.freecodecamp.org/news/how-to-create-a-react-app-with-a-node-backend-the-complete-guide/

*/


const http = require('node:http');
const express = require('express');
const app = express();

// Define port
const hostname = '127.0.0.1';
const port = 3000;

// How to create an endpoint
app.get('/api', (req, res) => { // '/api' is the endpoint. Typing at the end of URL will display message
  res.json({message: "Hello from server!"});
});

// Ensure server is running and endpoint is working
app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/api`);
});
