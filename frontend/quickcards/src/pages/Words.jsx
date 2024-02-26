import React, { useState } from 'react';


//data to loop through
const dictionary = {
  "Hola": "Hello",
  "aquí": "here",
  "como estas": "how are you",
  "No": "no",
  "Si": "yes"
};


  
  
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
                  </tr>
                ))}

              </tbody>
            </table>
        </div>

        
        </>
    )
}

