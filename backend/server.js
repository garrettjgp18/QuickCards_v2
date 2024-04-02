
/*
  This file contains the main logic of NodeJS, including the routes and POST / GET fetch request processing. 
*/


const http = require('node:http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer'); //Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files.
const fs = require('fs'); // Required for file system access
const pdfParse = require('pdf-parse'); // Require pdf-parse for PDF processing
const axios = require('axios');
const FormData = require('form-data');
require('dotenv').config();







// Define port
const hostname = '127.0.0.1';
const port = 3000;

// Multer setup for file uploads
const upload = multer({ dest: 'uploads/' }); // Files will be saved in 'uploads' folder


// Don't worry about these
app.use(bodyParser.json());
app.use(cors());


// ROUTES / ENDPOINTS --------------------------------------------


// Handles POST request to the /api endpoint
app.post('/create', (req, res) => {
  const recievedData = req.body;
  // Format data and display in terminal running NodeJS to ensure data is correct
  console.log(
    `\nRecieved from React:\n
    Media Type: ${recievedData.mediaType}\n 
    Number of Cards = ${recievedData.numberOfCards}\n 
    Schema: ${recievedData.currentSchema}\n 
    Extracted: ${recievedData.result}\n\n`); // Call OpenAI method and pass all variables in?


  // Send message back to React page (line 53 + 54 from CreatePage.jsx)
  res.json({message: "This is a message from NodeJS server -> Test complete"});
});





// CREATE -------------------------------------------------------

// New POST route for PDF processing
app.post('/pdf-process', upload.single('file'), async (req, res) => {
  // Check if a file was uploaded. If not, return an error response.
  if (!req.file) {
      return res.status(400).send({ message: 'Please upload a PDF file.' });
  }

  try {
     // Read the uploaded file into a buffer for processing  
    const pdfBuffer = await fs.promises.readFile(req.file.path);
     // Use pdf-parse library to extract text from the PDF buffer.  
    pdfParse(pdfBuffer).then(result => {
        // Retrieve the extracted text from the PDF.  
        const text = result.text;
        
        // Split the text into individual words based on whitespace
        const words = text.split(/\s+/);
        
        // Initialize an array to hold all arrays of words, with each sub-array up to 5000 words
        let textArrays = [];
        
        // A temporary array to accumulate words up to the limit (5000 words)
        let currentArray = [];
        
        // Iterate over each word in the extracted text.
        words.forEach(word => {
          // If the current array has less than 5000 words, add the word to it
            if (currentArray.length < 5000) {
                currentArray.push(word);
            } else {
                // If the current array reaches 5000 words, add it to the textArrays and start a new one.  
                textArrays.push(currentArray);
                currentArray = [word]; // Start new array with current word
            }
        });
        // After iterating, if there are any words in the current array, add it to the textArrays.
        if (currentArray.length > 0) {
            textArrays.push(currentArray);
        }
          
        console.log("Extracted Text Arrays:", textArrays); // Optionally log the arrays for verification

        // Send the arrays of extracted text back to the client side
        // TODO: Call OpenAI method from OpenAI.js, pass in textArrays
        res.send({ extractedTextArrays: textArrays });

        // Optionally, delete the file after processing to clean up server storage
        fs.unlinkSync(req.file.path);
      }).catch(error => {
          // Log and return an error response if there's an issue processing the PDF
          console.error('Error processing PDF:', error);
          res.status(500).send({ message: 'Error processing PDF' });
      });
  } catch (error) {
       // Catch and log any errors reading the file or other server issues
      console.error('Server Error:', error);
      res.status(500).send({ message: 'Internal Server Error' });
  }
});

//console.log(process.env.OPENAI_API_KEY);

// New POST route for audio file processing
app.post('/audio-process', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send({ message: 'Please upload an audio file.' });
  }

  try {
    const fileData = fs.createReadStream(req.file.path);
    const formData = new FormData();
    // Include the original file name and MIME type explicitly
    formData.append('file', fileData, {
      filename: req.file.originalname,
      contentType: req.file.mimetype
    });
    // Specify the model parameter here
    formData.append('model', 'whisper-1'); // Adjust the model as needed

    const response = await axios.post('https://api.openai.com/v1/audio/transcriptions', formData, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        ...formData.getHeaders(),
      },
    });

    // Cleanup: Delete the uploaded file after processing
    fs.unlinkSync(req.file.path);

    res.json(response.data);
  } catch (error) {
    console.error('Error processing audio:', error.response?.data || error);
    res.status(500).send({ message: 'Error in audio processing', details: error.response?.data });

    // Cleanup in case of failure
    if (req.file?.path) {
      fs.unlinkSync(req.file.path);
    }
  }
});



// Handles GET request to the API endpoint
// Mainly just so error page goes away
app.get('/create', (req, res) => {
  res.send(' You are currently on the /create endpoint ');
});


// Ensure server is running and endpoint is working
app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/create`);
});
