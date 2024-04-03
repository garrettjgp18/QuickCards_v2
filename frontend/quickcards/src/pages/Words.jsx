import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import {db, saveCards, getCards} from "/db.js";

//data to loop through
const dictionary = {};

const query = await db.card.each(card => {
  let keyword = card.keyword;
  let definition = card.definition;
  dictionary[keyword] = definition;
  // console.log ("Keyword: " + keyword + " Definition: " + definition);
});



//functions for button clicks

//Download CSV
const download = () =>{
  console.log("Downloading CSV");
}

const deleteWords = () =>{
  console.log("Deleting all the words");
  window.location.reload();
}

//edit word button
const editWord = (id) =>{

  //convert the dictionary object to an array to access it by ID
  const keyByIndex = Object.keys(dictionary)[id];
  //print the key
  console.log("Key: " + keyByIndex); 
  //print the value
  console.log("Value:" + dictionary[keyByIndex])

}
  
  
export default function Words(){
    return (
        <>

        {/*Text Box to enter schema */}
        <div className = "min-h-[70vh] h-auto w-3/4 border m-auto mt-12 rounded-xl shadow-lg overflow-auto">
            <table className="w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-6 bg-gray-50 text-left text-base leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Front
                  </th>
                  <th className="px-6 py-4 bg-gray-50 text-left text-base leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Back
                  </th>

                  {/* Cell for buttons */}
                  <th className="bg-gray-50 text-sm font-medium text-gray-500 flex sm:justify-end">
                  
                    {/* Study button -> Redirects to Flashcards*/}
                    <Link to="/cards">
                      <button className="bg-teal-500 rounded-md p-4 m-4 text-white hover:teal-600 active:scale-95 flex flex-row gap-2">
                        {/* Link to go to flashcards */}
                            <span className="text-2xl"><i className="bi-card-text"></i></span>
                        </button>
                      </Link>

                    {/* Download CSV -> Downloads all words as CSV file - DOES NOT REDIRECT*/}
                      <button onClick = {download} className="bg-sky-800 rounded-md p-4 m-4 text-white hover:bg-sky-900 active:scale-95 flex flex-row gap-2">
                          <span className="text-2xl"><i className="bi-download"></i></span>
                      </button>

                    {/* Clear all words from dexie -> Refresh page*/}
                      <button onClick = {deleteWords} className="bg-red-400 rounded-md p-4 m-4 text-white hover:bg-red-500 active:scale-95 flex flex-row gap-2">
                          <span className="text-2xl"><i className="bi-trash"></i></span>
                      </button>

                  </th>

                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">

                {/* Loop through "dictionary" object -  outputs vocabulary words in cells */}
                {Object.entries(dictionary).map(([word, definition], index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-no-wrap">
                      {word}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap">
                      {definition}
                    </td>
                                   
                     {/* Edit Button on far right of table - onclick gets ID and toggles modal */}
                    <td className="px-6 py-4 whitespace-no-wrap float-right mr-4">
                      <span onClick={() => editWord(index)} className="text-2xl text-gray-400 hover:text-gray-500 hover:cursor-pointer active:scale-95">
                        <i className="bi-pencil-fill"></i>
                      </span>
                    </td>
                  </tr>
                ))}

              </tbody>
            </table>
        </div>

        
        </>
    )
}

