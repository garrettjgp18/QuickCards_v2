import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { db, saveCards, getCards, updateCard } from "/db.js";

// Dictionary that holds values from Dexie
const dictionary = {};

// Query the database to populate dictionary
const query = await db.card.each(card => {
  let keyword = card.keyword;
  let definition = card.definition;
  dictionary[keyword] = definition;
});


//functions for button clicks

function populateExampleCards() {
  const exampleCard1 = { keyword: 'Example 1', definition: 'This is the definition of example 1.' };
  const exampleCard2 = { keyword: 'Example 2', definition: 'This is the definition of example 2.' };
  // Add more example cards as needed


  // Insert example cards into the database
  //saveCards(exampleCard1.keyword, exampleCard1.definition);
  db.card.add(exampleCard1)
  //window.location.reload();
}

async function convertToCSV() {

  let csvRows = [['id', 'keyword', 'definition']];

  try {

    await db.card.each(card => {
      //console.log(card);
      const row = [card.id, card.keyword, card.definition];
      csvRows.push(row);
    });
  } catch (error) {
    console.error('Error adding card to database:', error);
  }

  console.log(csvRows);
  return csvRows.join('\n');

}

//Download CSV
async function downloadCSV() {

  try {
    const csvContent = await convertToCSV();

    console.log(csvContent);
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'cards.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

  } catch (error) {
    console.error('Error downloading CSV:', error);
  }
}


async function deleteWords() {
  console.log("Deleting all the words");

  try {
    // Clear the "card" table in the database
    await db.card.clear();
    console.log('All cards deleted from the database.');
  } catch (error) {
    console.error('Error deleting cards from the database:', error);
  }

  window.location.reload();
}

//edit word button
const editWord = async (id) => {

  try {

    await db.open();
    // query all Dexie data into array
    // get the definition of the current card selected.

    // query all Dexie data into array
    // -- This makes it much easier to edit the information in place, while also updating the database. Could also use the map created in HTML -- 
    const currentCard = await db.card.toArray();
    // get the definition of the current card selected.
    const changeDef = currentCard[id].id;

    // -- Testing purpose
    // console.log(changeDef);


    const cell = document.getElementById(id + 'a');
    cell.contentEditable = true;
    cell.focus();

    cell.addEventListener('keypress', async function (event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        const newDefinition = cell.textContent.trim(); // Remove leading/trailing whitespace
        await updateCard(changeDef, newDefinition); // Pass only the new definition
        cell.contentEditable = false;
        window.location.reload();
      }
    });

  } catch (error) {
    console.error('Error updating word:', error);
  }


}

//delete a single word

const deleteWord = async (id) => {
  try {
    // Open the Dexie database connection if not already open
    await db.open();

    const currentCard = await db.card.toArray();
    // get the definition of the current card selected.
    const changeDef = currentCard[id].id;

    console.log(changeDef);

    // Get the word (card) from the database using its index
    const wordToDelete = await db.card.get(changeDef);

    if (wordToDelete) {
      // If the word (card) exists, delete it from the database
      await db.card.delete(changeDef);
      console.log('Word deleted successfully:', wordToDelete);
      window.location.reload();
      // Optionally, you can perform additional actions after deletion
    } else {
      console.error('Word not found with index:', changeDef);
    }
  } catch (error) {
    console.error('Error deleting word:', error);
  }
};

export default function Words() {
  return (
    <>

      {/*Text Box to enter schema */}
      <div className="min-h-[70vh] h-auto w-3/4 border m-auto mt-12 rounded-xl shadow-lg overflow-auto">
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
                <button onClick={downloadCSV} className="bg-sky-800 rounded-md p-4 m-4 text-white hover:bg-sky-900 active:scale-95 flex flex-row gap-2" id='dload'>
                  <span className="text-2xl"><i className="bi-download"></i></span>
                </button>

                {/* Clear all words from dexie -> Refresh page*/}
                <button onClick={deleteWords} className="bg-red-400 rounded-md p-4 m-4 text-white hover:bg-red-500 active:scale-95 flex flex-row gap-2">
                  <span className="text-2xl"><i className="bi-trash"></i></span>
                </button>

              </th>

            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">

            {/* Loop through "dictionary" object -  outputs vocabulary words in cells */}
            {Object.entries(dictionary).map(([word, definition], index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-no-wrap" id={index}>
                  {word}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap" id={index + 'a'}>
                  {definition}
                </td>

                {/* Edit Button on far right of table - onclick gets ID and toggles modal */}
                <td className="px-6 py-4 whitespace-no-wrap float-right mr-4 flex flex-row gap-4">
                  <span onClick={() => editWord(index)} className="text-2xl text-gray-400 hover:text-gray-500 hover:cursor-pointer active:scale-95">
                    <i className="bi-pencil-fill"></i>
                  </span>
                  <span onClick={() => deleteWord(index)} className="text-2xl text-red-400 hover:text-red-500 hover:cursor-pointer active:scale-95">
                    <i className="bi-trash-fill"></i>
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

