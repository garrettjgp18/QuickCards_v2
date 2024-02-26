import React, { useState } from 'react';

const ListItem = ({ front, back }) => {
    return (
      <div className="flex justify-between items-center py-3">
        <div>{front}</div>
        <div>{back}</div>
        <button className="text-teal-500 hover:text-teal-600">
          {/* Insert icon here */}
        </button>
      </div>
    );
  };
  
  
  
export default function Words(){
    return (
        <>

        {/*Text Box to enter schema */}
        <div >
            <h1>Render Words List Here</h1>
        </div>

        
        </>
    )
}

