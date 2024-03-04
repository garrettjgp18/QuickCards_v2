import React, { useState } from 'react';

// Import the methods from the extraction APIs here

export default function Navbar(){

  
    // Define state variables (hooks)
    const [currentId, setCurrentId] = useState("Video");
    const [numberOfCards, setNumberOfCards] = useState(""); // State variable for number of cards - setNumberOfCards will update value once changed
    const [currentSchema, setCurrentSchema] = useState(""); // Same goes here

    // Function to update number of cards state
    const handleNumberOfCardsChange = (event) => {
        setNumberOfCards(event.target.value);
    }

    // Function to update the schema 
    const changeCurrentSchema = (event) => {
        setCurrentSchema(event.target.value);
    }

    // Function to update mode 
    const selectMode = (id) => {
        setCurrentId(id);
    }

   
    // Opens users file manager so they can select a media
    const uploadContent = () => {
        console.log("Upload Content");
    }

    // Once "Generate Cards" button is clicked, start this asyncronus process
    const submitData = async () => {

        // Calls the function that determines the extraction method to call
        let promptResult = await mediaQueryHandler(currentId);
        console.log(promptResult);

        // Create a JSON transfer structure
        const dataObject = {
            mediaType: `${currentId}`, // Holds current state of ID (use mediaType in server.js)
            numberOfCards: numberOfCards, // Holds current state of numberOfCards
            currentSchema: currentSchema, // Holds current state of schema 
            result: promptResult // Holds extracted text
        };

        try {
            // Start a fetch request using POST  method and send dataObject as payload
            const response = await fetch('http://127.0.0.1:3000/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataObject)
            });

            // If this appears, make sure both NodeJS and ReactJS clients are running in SEPERATE terminals
            if (!response.ok) {
                throw new Error("No network response");
            }

            // Wait for response from NodeJS server, once recieved, print to developer console
            const responseData = await response.json();
            console.log("Response from server: " + responseData.message);
        } catch(error) {
            console.log("Error sending data to server: " + error);
        }

        console.log("Transfer complete");
    }


    // Changes the method in JSON structure that will be called when "Generate Cards" button is pressed
    // Holds off until variable is ready to be initilized 
    const mediaQueryHandler = async (mediaType) => {

        let promptResult = "";

        switch(mediaType) {
            case 'Video':
                // Placeholder values. Once extraction methods are created, change to promptResult = pdfExtract() and so on
                promptResult = "VIDEO";
                break;
            case 'PDF':
                promptResult = "PDF";
                break;
            case 'Audio':
                promptResult = "AUDIO";
                break;
            default:
                promptResult = "TEXT";
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
                    <button onClick={uploadContent} className={`bg-teal-500 rounded-md p-4 text-white hover:bg-teal-600 active:scale-95 ${currentId == "Text" || currentId == "Video" ? "hidden" : "" }`}>Upload {currentId}</button>

                    {/* Render Input Form if User selects Video  */}
                    <input type="text" className= {`border rounded w-5/6 p-2 ${currentId == "Video" ? "block" : "hidden" }`} placeholder="Enter Youtube URL" />

                </div>
                <div className="w-full h-[12vh] md:w-1/2 flex flex-row gap-4 items-center align-middle">
                    <h1 className="text-gray-600 text-lg font-medium">Number of Cards:</h1>
                    {/* // Assigning value ensures the state is always in sync and controlled. Once value is changed, update numberOfCards value in state variable*/}
                    <input type="text" className="border rounded w-1/5 p-2" value={numberOfCards} onChange={handleNumberOfCardsChange} placeholder="15" />
                </div>
            </div>

            <div className="w-4/5 ml-auto mr-auto mt-8">
                <h1 className = "text-gray-600 text-lg font-medium">Describe what you want:</h1>

                {/*Text Box to enter schema */}
                <textarea type="text" className="border rounded w-full h-48 p-2 mt-4" value={currentSchema} onChange={changeCurrentSchema} placeholder="e.g Spanish words with their English translations based on the video">
                </textarea>

                {/*Submit Button */}
                <button onClick={submitData} className="bg-teal-500 rounded-md p-4 w-full mt-4 text-white hover:bg-teal-600 active:scale-95">Generate Cards</button>



            </div>



        </div>

        </>
        )
}