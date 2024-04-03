import React, { useState } from 'react';


//dictionary loaded in from dexie
//data to loop through
const dictionary = {
    "Hola": "Hello",
    "aquí": "here",
    "como estas": "how are you",
    "No": "no",
    "Si": "yes"
};
  

//current card value



const nextCard = () =>{
    console.log("next card");
}

const prevCard = () =>{
    console.log("previous card");
}

//current card value


export default function Words(){
    return (
        <>

        {/*Center Container */}
        <div className = "min-h-[70vh] w-3/4 m-auto mt-12">

            {/*Flashcard */}
            <div className = "w-3/4 h-[50vh] border m-auto mt-4 rounded-xl shadow-lg overflow-auto hover:bg-gray-50 hover:cursor-pointer active:scale-95 flex items-center justify-center">
                {/*Flashcard Content*/}
                <h1 className = "text-3xl text-gray-500">Word 1</h1>
            </div>

            {/*Buttons - Container*/}
            <div className="flex flex-row gap-10 mt-16 justify-center">
                {/*Previous Card - Left Button*/}   
                <div onClick = {prevCard} className='w-20 h-20 border-2 rounded-xl flex flex-col justify-center items-center hover:cursor-pointer hover:bg-gray-100 active:scale-95'>
                    <span className="text-2xl text-gray-500 hover:text-gray-600"><i className="bi-caret-left-fill"></i></span>
                </div>

                {/*Display Card Number*/}
                <div className="flex items-center">
                    <h1 className = "text-gray-600 text-2xl">15/30</h1>
                </div>

                {/*Next Card - Right Button*/}
                <div onClick = {nextCard} className='w-20 h-20 border-2 rounded-xl flex flex-col justify-center items-center hover:cursor-pointer hover:bg-gray-100 active:scale-95'>
                    <span className="text-2xl text-gray-500 hover:text-gray-600"><i className="bi-caret-right-fill"></i></span>
                </div>

            </div>



        </div>

        </>
    )
}

