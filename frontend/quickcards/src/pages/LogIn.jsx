import { Link, NavLink } from 'react-router-dom'
import React, { useState } from 'react';


export default function LogIn(){

    return (
        <>
        {/* Body Container With Background image */}
        <div className="bg-neural h-screen w-full bg-cover bg-center">
            {/* Main container */}
            <div className = "min-h-[70vh] h-auto w-3/4 border m-auto rounded-xl shadow-lg bg-white relative top-10">
                {/* Top Horizontal Container with Title and Log In Button */}
                <div className="flex flex-row justify-between m-10 p-4">
                    <h1 className="text-3xl font-medium text-gray-600">Log In</h1>
                    {/* Register Button - Redirect to Register Page  */}
                    <Link to="/register" className="no-underline">
                        <button className="bg-white rounded-md px-5 py-3 text-gray border-2 border-gray-300 text-gray-500 hover:bg-gray-100 active:scale-95 flex flex-row gap-2 relative bottom-2">
                            <span className="hidden md:block mt-1">Register</span>
                            <span className="text-2xl md:text-2xl"><i className="bi-box-arrow-in-right"></i></span>
                        </button>
                    </Link>
                </div>
                {/* Container with forms and submit button */}
                <div className = "flex flex-col gap-6 m-10 p-4">
                     {/* Enter Email */}
                     <label htmlFor="emailInput" className="block text-gray-500 text-2xl">Email:</label>
                     <input type="text" id="emailInput" className="border-2 border-gray-300 bg-gray-50 rounded-lg w-full h-16 p-4" placeholder="Enter your email" />

                     {/* Enter Password */}
                    <label htmlFor="passwordInput" className="block text-gray-500 text-2xl">Password:</label>
                    <input type="text" id="passwordInput" className="border-2 border-gray-300 bg-gray-50 rounded-lg w-full h-16 p-4"  placeholder="Enter your password" />

                     {/* Submit Button */}
                     <button className="bg-teal-500 rounded-md p-3 mt-8 text-white text-xl hover:bg-teal-600 active:scale-95">
                       Log In
                    </button>

                    {/* Forgot Password */}
                    <h1 className="text-center text-teal-500 hover:text-teal-600 active:scale-95 text-xl cursor-pointer">Forgot your password?</h1>

                </div>

            </div>
            
        </div>
        </>        
        )
}