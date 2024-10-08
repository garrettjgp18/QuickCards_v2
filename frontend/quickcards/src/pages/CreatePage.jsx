import React, { useState, useRef } from 'react';
import axios from 'axios'; //Axios is a promise-based HTTP Client for node.js and the browser
import { db, saveCards, getCards } from "/db.js";
import { useNavigate } from "react-router-dom";

export default function Navbar() {

    const navigate = useNavigate();


    // Define state variables (hooks)
    const [currentId, setCurrentId] = useState("Video");
    const [numberOfCards, setNumberOfCards] = useState(""); // State variable for number of cards - setNumberOfCards will update value once changed
    const [currentSchema, setCurrentSchema] = useState(""); // Same goes here
    const [videoURL, setVideoURL] = useState("");

    const handleVideoChange = (event) => {
        setVideoURL(event.target.value);
        console.log(event.target.value);
    }

    // Function to update number of cards state
    const handleNumberOfCardsChange = (event) => {
        const value = event.target.value;
        // Use a regular expression to check if the value is a positive integer
        if (/^\d+$/.test(value) || value === "") {
            setNumberOfCards(value);
        }
    }

    // Function to update the schema 
    const changeCurrentSchema = (event) => {
        setCurrentSchema(event.target.value);
    }

    // Function to update mode 
    const selectMode = (id) => {
        setCurrentId(id);
    }

    // Reference for the file input element
    const fileInputRef = useRef(null);

    // Function to open file dialog
    const openFileDialog = () => {
        fileInputRef.current.click();
    }

    // Add a state to hold the uploaded file
    const [uploadedFile, setUploadedFile] = useState(null);

    const [fileType, setFileType] = useState(""); // Add this to store the file type

    // Function to handle file selection
    const handleFileUpload = async (event) => {
        console.log("handleFileUpload started");
        // Retrieve the first selected file from the file input event
        const file = event.target.files[0];
        // Check if a file was actually selected
        if (!file) {
            console.log("No file selected.");
            return;
        }
        // Log the name of the uploaded file for verification
        console.log("Uploaded file:", file.name);

        // Determine the file type (e.g., PDF, Audio) to handle accordingly
        //This checks if the MIME type of the uploaded file is "application/pdf", indicating it's a PDF file.
        //If this condition is true, fileType is assigned the value "PDF".
        //If it's false, the code after the colon (:) is evaluated next.
        const determinedFileType = file.type === "application/pdf" ? "PDF" :

            //This part is reached if the first condition is false, meaning the file is not a PDF.
            //It checks if the MIME type of the file starts with "audio/", a common prefix for audio files (e.g., "audio/mp3", "audio/wav").
            //If this condition is true, fileType is assigned the value "Audio".
            //If it's false, the value after the second colon (:) is used.
            file.type.startsWith("audio/") ? "Audio" :

                //This value is assigned if both previous conditions are false, meaning the file is neither a PDF nor an audio file as defined by your conditions.
                "Unsupported";

        // ######## Old implementation, removed besuase mediQueryHandler was called twice, worried about unnessecary overhead #########
        // Call mediaQueryHandler to process the file based on its type, passing both type and file
        //const extractedData = await mediaQueryHandler(fileType, file);

        setUploadedFile(file); // Store the uploaded file in state
        setFileType(determinedFileType); // Also store the determined file type

        // Log the result of the file handling, which could be processed data or an error message
        //console.log("Handled File Data:", extractedData);
    };

    // Set file types the system will accept based on the selected media type
    const acceptedFileTypes = {
        PDF: ".pdf",
        Audio: ".mp3, .mp4, .wav, .m4a"
    };

    // Once "Generate Cards" button is clicked, start this asynchronous process
    const submitData = async () => {
        console.log('submitData started');

        //redirect to Words page
        navigate("/words");

    
        let promptResult;
    
        try {
            // Call mediaQueryHandler to process the file based on its type, passing both type and file
            promptResult = await mediaQueryHandler(currentId, uploadedFile);
            console.log("transcript loaded into payload");
    
            // Check if promptResult is null, empty, or falsy
            if (!promptResult) {
                console.log("promptResult is null, empty, or falsy. Aborting further execution.");
                return; // Exit the function
            }
    
            // Create a JSON transfer structure
            const dataObject = {
                mediaType: `${currentId}`, // Holds current state of ID (use mediaType in server.js)
                numberOfCards: numberOfCards, // Holds current state of numberOfCards
                currentSchema: currentSchema, // Holds current state of schema 
                result: promptResult // Holds flattened extracted text
            };
    
            // Start a fetch request using POST method and send dataObject as payload
            const response = await fetch('http://127.0.0.1:3000/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataObject) // convery into easy readible string
            });
    
            console.log("fetch to OpenAI complete");
    
            // If this appears, make sure both NodeJS and ReactJS clients are running in SEPARATE terminals
            if (!response.ok) {
                throw new Error("No network response");
            }
    
            // Wait for response from NodeJS server, once received, print to developer console
            const responseData = await response.json();
            console.log("waiting on OpenAI...");
            console.log("Extracted: \n", responseData.text);
    
            // -- OpenAI adjustment stuff
            // split OpenAI output by end-of-line markers. Filter out empty strings
            const pairs = responseData.text.split('\n').filter(Boolean);
    
            // Traverse all pairs - split each pair by ":", map keyword and definiton with no whitespace
            for (const pair of pairs) {
                const [keyword, definition] = pair.split(':').map(item => item.trim());
                // Enable if you need to test anything
                // console.log("keyword: ", keyword);
                // console.log("definition: ", definition);
    
                // save parsed information to database
                saveCards(keyword, definition);
            }

            // Reload page so new cards appear
            window.location.reload();


    
        } catch (error) {
            alert("Whoops! An error occured...");
            console.log("Error in processing:", error);
        }
    
        console.log("Transfer complete");
    }
    

    // Asynchronously processes a PDF file by sending it to a server endpoint for processing
    async function processPDF(pdfFile) {
        console.log("processPDF started");
        // Create a FormData object to hold the file data for the POST request
        const formData = new FormData();
        // Append the selected PDF file under the key 'file', which the server expects
        formData.append('file', pdfFile);

        try {
            // Send a POST request to the server's '/pdf-process' endpoint with the FormData
            // Axios automatically sets the appropriate `Content-Type` header for multipart/form-data
            const response = await axios.post(`http://127.0.0.1:3000/pdf-process`, formData);

            // The response from the server is expected to contain the processed data
            // For instance, it could be the text extracted from the PDF, organized in arrays
            const extractedData = response.data;
            // Return the processed data for further use
            return extractedData.extractedTextArrays.flat().join(' '); // Removes all formatting by "flattening" the arrays 
            ;
        } catch (error) {
            // Log any errors that occur during the file upload or processing
            console.error('Error processing PDF:', error);
            alert("Whoops! There was an issue transcribing your PDF. Did you upload a file?");
            // Return a default error message to handle the error gracefully
            return;
        }
    }


    async function processVideo(videoURL) {
        
        
        const response = await axios.post(`http://127.0.0.1:3000/video-process`, {videoURL:videoURL} );
        const extractedTranscript = response.data;
        return extractedTranscript;
        
       

    }

     // Asynchronously processes an audio file by sending it to a server endpoint for processing
     async function processAudio(audioFile) {
        const formData = new FormData();
        formData.append('file', audioFile);
    
        try {
            const response = await axios.post('http://127.0.0.1:3000/audio-process', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            // Assuming the response directly contains the transcription text, we might need to adjust this based on actual structure
            console.log("Audio Transcription Response:", response.data);
            const extractedAudio = response.data;
            // Wrap the text in an object with extractedTextArrays for consistency
            return extractedAudio.text; // Adjust response.data.transcription as needed
        } catch (error) {
            console.error('Error processing audio:', error);
            alert("Whoops!  There was an issue transcribing your audio. Did you upload a file?");
            return; // Provide a default structure even in error cases
        }
    }

    // Changes the method in JSON structure that will be called when "Generate Cards" button is pressed
    // Holds off until variable is ready to be initialized 
    const mediaQueryHandler = async (mediaType, file) => {
        console.log("mediaQueryHandler started");

        let promptResult = "";

        switch (mediaType) {
            case 'Video':
                // Placeholder values. Once extraction methods are created, change to promptResult = pdfExtract() and so on
                promptResult = await processVideo(videoURL);
                break;
            case 'PDF':
                // PDF processing logic - calling processPDF function to handle PDFs
                promptResult = await processPDF(file);
                break;
            case 'Audio':
                // Calling processAudio function to handle audio files      
                promptResult = await processAudio(file);
                break;
            default:
                promptResult = "Make keywords based off the schema given to you.";
                break;
        }

        return promptResult;
    }

    return (
        <>
            <div className="min-h-[70vh] h-auto w-3/4 border m-auto mt-12 rounded-xl p-4 shadow-lg">
                <div className="w-4/5 h-16 flex items-center justify-center ml-auto mr-auto">
                    <ul className="w-auto mt-4 flex flex-row gap-12 md:gap-16 lg:gap-24 xl:gap-28 2xl:gap-36 justify-center align-middle text-2xl md:text-xl text-gray-600">
                        <li onClick={() => selectMode("Video")} className={`cursor-pointer flex flex-row gap-2 ${currentId === "Video" ? 'text-teal-500' : 'hover:text-teal-500 active:scale-95'}`}>
                            <span className="hidden md:block">Video</span>
                            <span className="text-3xl md:text-2xl relative bottom-0.5"><i className="bi-camera-video"></i></span>
                        </li>
                        <li onClick={() => selectMode("PDF")} className={`cursor-pointer flex flex-row gap-2 ${currentId === "PDF" ? 'text-teal-500' : 'hover:text-teal-500 active:scale-95'}`}>
                            <span className="hidden md:block">PDF</span>
                            <span className="text-3xl md:text-2xl relative bottom-0.5"><i className="bi-file-pdf"></i></span>
                        </li>
                        <li onClick={() => selectMode("Text")} className={`cursor-pointer flex flex-row gap-2 ${currentId === "Text" ? 'text-teal-500' : 'hover:text-teal-500 active:scale-95'}`}>
                            <span className="hidden md:block">Text</span>
                            <span className="text-3xl md:text-2xl relative bottom-0.5"><i className="bi-text-paragraph"></i></span>
                        </li>
                        <li onClick={() => selectMode("Audio")} className={`cursor-pointer flex flex-row gap-2 ${currentId === "Audio" ? 'text-teal-500' : 'hover:text-teal-500 active:scale-95'}`}>
                            <span className="hidden md:block">Audio</span>
                            <span className="text-3xl md:text-2xl relative bottom-0.5"><i className="bi-headphones"></i></span>
                        </li>
                    </ul>
                </div>

                <hr className="bg-gray-200 h-0.5 w-full md:w-[90%] mr-auto ml-auto mt-1" />
                {/*Container below the tabs */}
                <div className="flex flex-col md:flex-row gap-0 w-4/5 mr-auto ml-auto mt-8">
                    <div className="w-full md:w-1/2 h-[12vh] flex items-center align-middle">
                        {/*Upload Content Button */}
                        {/*If "Text" or "Video" tab is selected - button does not render */}
                        <button onClick={openFileDialog} className={`bg-teal-500 rounded-md p-4 text-white hover:bg-teal-600 active:scale-95 ${currentId === "Text" || currentId === "Video" ? "hidden" : ""}`}>Upload {currentId}</button>

                        {/* File input element */}
                        {/* Basically, useRef is creating a "refrence" to the "upload" button, allowing it to be used throughout the code. When the upload button is clicked, it
                        launches the uploadFileDialog method, which refrences the input field below for the data. Setting the display to "none" removes it from the visual.
                    */}
                        <input
                            ref={fileInputRef}
                            type="file"
                            style={{ display: 'none' }}
                            onChange={handleFileUpload}
                            accept={acceptedFileTypes[currentId]}
                        />

                        {/* Render Input Form if User selects Video  */}
                        <input type="text" className={`border rounded w-5/6 p-2 ${currentId === "Video" ? "block" : "hidden"}`} value={videoURL} onChange={handleVideoChange} placeholder="Enter Youtube URL" />

                    </div>
                    <div className="w-full h-[12vh] md:w-1/2 flex flex-row gap-4 items-center align-middle">
                        <h1 className="text-gray-600 text-lg font-medium">Number of Cards:</h1>
                        {/* // Assigning value ensures the state is always in sync and controlled. Once value is changed, update numberOfCards value in state variable*/}
                        <input type="text" className="border rounded w-1/5 p-2" value={numberOfCards} onChange={handleNumberOfCardsChange} placeholder="15" />
                    </div>
                </div>

                <div className="w-4/5 ml-auto mr-auto mt-8">
                    <h1 className="text-gray-600 text-lg font-medium">Describe what you want:</h1>

                    {/*Text Box to enter schema */}
                    <textarea type="text" className="border rounded w-full h-48 p-2 mt-4" value={currentSchema} onChange={changeCurrentSchema} placeholder="e.g Spanish words with their English translations based on the video">
                    </textarea>

                    {/*Submit Button */}
                    <button onClick={submitData} className="bg-teal-500 rounded-md p-4 w-full mt-4 text-white hover:bg-teal-600 active:scale-95">Generate Cards</button>
                </div>
            </div>
        </>
    );
}
