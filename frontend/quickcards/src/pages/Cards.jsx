import React, { useState } from 'react';
import {db} from "/db.js";

// Create dictionary to hold values from Dexie
const dictionary = {};

// Query the database to populate dictionary
const query = await db.card.each(card => {
    let keyword = card.keyword;
    let definition = card.definition;
    dictionary[keyword] = definition;
});


export default function Words(){

    //KEYBOARD FUNCTIONS
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === ' ') {
            //flip card
            flipCard();
            } 
        else if (event.key === 'ArrowRight') {
            //next card 
            nextCard();
            } 
        else if (event.key === 'ArrowLeft') {
            //previous card
            prevCard();
        } 
    });

    //convert dictionary to an array to grab index
    const keyByIndex = Object.keys(dictionary);

    //create currentIndex reactive variable to change current increment or decrement current index
    const [currentIndex, changeIndex] = useState(0);

    //current card value, stores word - get value from dictionary
    const [currentCard, changeCard] = useState(keyByIndex[currentIndex]);

    //go to next card
    const nextCard = () =>{

        //define changing index variable
        let nextIndex;

        //If current index reaches end of the deck
        if (currentIndex ==  keyByIndex.length - 1){
            //set index to 0
            nextIndex = 0;
        } else{
            //else increment card by 1 
            nextIndex = currentIndex + 1;
        }

        // Update the currentIndex state
        changeIndex(nextIndex);
        //change card text by loading in current index
        changeCard(keyByIndex[nextIndex]);
    }

    //go to previous card
    const prevCard = () =>{
        //define changing index variable
        let prevIndex;

        //If current index reaches end of the deck
        if (currentIndex ==  0){
            //set index to 0
            prevIndex = keyByIndex.length - 1;
        } else{
            //else decrement card by 1 
            prevIndex = currentIndex - 1;
        }

        // Update the currentIndex state
        changeIndex(prevIndex);
        //change card text by loading in current index
        changeCard(keyByIndex[prevIndex]);

    }

    const [flipped, changeFlip] = useState(false);

    //flip card
    const flipCard = () =>{
        //toggle true false variable
        changeFlip(!flipped);
    }


    return (
        <>

        {/*Center Container */}
        <div className = "min-h-[70vh] w-3/4 m-auto mt-12">

            {/*Flashcard */}
            <div onClick = {flipCard} className = "w-3/4 h-[50vh] border m-auto mt-4 rounded-xl shadow-lg overflow-auto hover:bg-gray-50 hover:cursor-pointer active:scale-95 flex items-center justify-center">
                {/*Flashcard Content*/}

               {/*If flipped variable is false, currentCard shows, if flipped is true, dictionary[currentCard] to show definition  */}
                {flipped ? <h1 className="text-3xl text-gray-500 select-none">{currentCard}</h1> :<h1 className="text-3xl text-gray-500 select-none">{dictionary[currentCard] }</h1>}

            </div>

            {/*Buttons - Container*/}
            <div className="flex flex-row gap-10 mt-16 justify-center">
                {/*Previous Card - Left Button*/}   
                <div onClick = {prevCard} className='w-20 h-20 border-2 rounded-xl flex flex-col justify-center items-center hover:cursor-pointer hover:bg-gray-100 active:scale-95'>
                    <span className="text-2xl text-gray-500 hover:text-gray-600"><i className="bi-caret-left-fill"></i></span>
                </div>

                {/*Display Card Number*/}
                <div className="flex items-center">
                    {/* Current Index + 1 / Length of Deck */}
                    <h1 className = "text-gray-600 text-2xl select-none"> { currentIndex + 1 } / { keyByIndex.length } </h1>
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

