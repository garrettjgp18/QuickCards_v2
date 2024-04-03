import React from 'react'
import { Link } from 'react-router-dom'

export default function Landing(){
    
    return (
        <>
        <div className = "bg-black">
            {/* Top Nav Bar */}
            <div className = "flex flex-row gap-4 h-[14vh] w-full bg-black justify-between">
                {/* Left Side */}
                <div className = "w-1/3 flex justify-start align-middle">
                    {/*Full Logo when not mobile */}
                    <img src = "src/assets/full_logo.png" className = "hidden sm:block w-full h-auto object-contain"></img>
                    {/*Just the Icon when mobile */}
                    <img src = "src/assets/logo_icon.png" className = "sm:hidden w-full h-auto object-contain"></img>
                </div>
            </div>        

            {/* Landing Page Container */}
            <div className="h-[86vh] w-full flex flex-col md:flex-row-reverse">
                {/* Left Side */}
                <div className='w-full h-[43vh] md:h-[86vh] bg-black flex justify-center align-middle'>
                    <img src = "src/assets/landing_img.png" className = "w-full h-auto object-contain"></img>
                </div>

                {/* Right Side */}
                <div className='w-full h-[43vh] md:h-[86vh] bg-black'>
                    <div className='flex flex-col gap-8 justify-center align-middle w-full h-full p-8'>
                        <h1 className='text-white text-5xl'>The Future of AI Flashcards</h1>
                        <h1 className='text-white text-2xl'>Generate videos, pdfs, and audio into flashcards with precision</h1>

                        <div className = "flex flex-row gap-8 align-middle w-full h-16">
                            <button className="bg-teal-500 rounded-md p-4 px-6 text-white hover:bg-teal-600 active:scale-95">
                                {/* Get Started Button -> Redirects to create page for now */}
                                <Link to="/create" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                                    Get Started
                                </Link>
                            </button>

                            {/* Sign in Text to the right of button */}
                           {/*  <Link to="/login" className='text-white text-xl mt-4 hover:text-teal-500 cursor-pointer active:scale-95'>
                            Log In
                            </Link>*/}

                        </div>
                    </div>
                </div>

            </div>
        </div>
        </>
    )
}

