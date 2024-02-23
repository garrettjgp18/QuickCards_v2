
import React, { useState } from 'react';


export default function Navbar(){

    //define variable which takes the name of the mode and sets it to the variable 
    const [currentId, setCurrentId] = useState("Video");

    const selectMode = (id) =>{
        //set current id 
        setCurrentId(id);
    }


    const uploadContent = () =>{
        console.log("Upload Content");
    }


    const submitData = () =>{
        console.log("Submit Data");
    }

    return (
        <>

        {/*Container */}
        <div className = "min-h-[70vh] h-auto w-3/4 border m-auto mt-12 rounded-xl p-4 shadow-lg">
            {/*Top Box with Options */}
            <div className = "w-4/5 h-16 flex items-center justify-center ml-auto mr-auto">
                <ul className="w-auto mt-4 flex flex-row gap-12 md:gap-16 lg:gap-24 xl:gap-28 2xl:gap-36 justify-center align-middle text-2xl md:text-xl text-gray-600">
                    {/* Hide text and show icons when in mobile view */}
                    <li onClick={() => selectMode("Video")} className= {`cursor-pointer flex flex-row gap-2 ${currentId === "Video" ? 'text-teal-500' : 'hover:text-teal-500 active:scale-95'}`}>
                        <span className="hidden md:block">Video</span>
                        <span className="text-3xl md:text-2xl relative bottom-0.5"><i className="bi-camera-video"></i></span>
                    </li>
                    <li onClick={() => selectMode("PDF")} className= {`cursor-pointer flex flex-row gap-2 ${currentId === "PDF" ? 'text-teal-500' : 'hover:text-teal-500 active:scale-95'}`}>
                        <span className="hidden md:block">PDF</span>
                        <span className="text-3xl md:text-2xl relative bottom-0.5"><i className="bi-file-pdf"></i></span>
                    </li>
                    <li onClick={() => selectMode("Text")} className= {`cursor-pointer flex flex-row gap-2 ${currentId === "Text" ? 'text-teal-500' : 'hover:text-teal-500 active:scale-95'}`}>
                        <span className="hidden md:block">Text</span>
                        <span className="text-3xl md:text-2xl relative bottom-0.5"><i className="bi-text-paragraph"></i></span>
                    </li>
                    <li onClick={() => selectMode("Audio")} className= {`cursor-pointer flex flex-row gap-2 ${currentId === "Audio" ? 'text-teal-500' : 'hover:text-teal-500 active:scale-95'}`}>
                        <span className="hidden md:block">Audio</span>
                        <span className="text-3xl md:text-2xl relative bottom-0.5"><i className="bi-headphones"></i></span>
                    </li>
                </ul>
            </div>

            <hr className = "bg-gray-200 h-0.5 w-full md:w-[90%] mr-auto ml-auto mt-1" />

            {/*Flex box with  upload button, video upload message, and number of cards to generate */}
            <div className="flex flex-col md:flex-row gap-0 w-4/5 mr-auto ml-auto mt-8">
                <div className="w-full md:w-1/2 h-[12vh] flex items-center align-middle">
                    <button onClick ={uploadContent} className="bg-teal-500 rounded-md p-4 text-white hover:bg-teal-600 active:scale-95">Upload {currentId}</button>
                </div>
                {/* Number of Cards Input */}
                <div className="w-full h-[12vh] md:w-1/2 flex flex-row gap-4 items-center align-middle">
                    <h1 className = "text-gray-600 text-lg font-medium">Number of Cards:</h1>
                    <input type="text" className="border rounded w-1/5 p-2" placeholder="15" />
                </div>
            </div>

            {/*Text Box CONTAINER to enter schema */}
            <div className="w-4/5 ml-auto mr-auto mt-8">
                <h1 className = "text-gray-600 text-lg font-medium">Describe what you want:</h1>

                {/*Text Box to enter schema */}
                <textarea type="text" className="border rounded w-full h-48 p-2 mt-4" placeholder="e.g Spanish words with their English translations based on the video">
                </textarea>

                {/*Submit Button */}
                <button onClick={submitData} className="bg-teal-500 rounded-md p-4 w-full mt-4 text-white hover:bg-teal-600 active:scale-95">Generate Cards</button>



            </div>



        </div>

        </>
        )
}