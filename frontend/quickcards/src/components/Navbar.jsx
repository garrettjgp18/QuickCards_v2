export default function Navbar(){

    return (
        <>
        {/* Top Nav Bar */}
            <div className = "flex flex-row gap-4 h-[15vh] w-full bg-sky-950 justify-between">
                {/* Left Side */}
                <div className = "w-1/3 flex justify-start align-middle">
                    {/*Full Logo when not mobile */}
                    <img src = "src/assets/full_logo.png" className = "hidden sm:block w-full h-auto object-contain"></img>
                    {/*Just the Icon when mobile */}
                    <img src = "src/assets/logo_icon.png" className = "sm:hidden w-full h-auto object-contain"></img>

                </div>
                {/* Right Side */}
                <div className = "w-1/3 flex justify-center items-center">

                    {/*Text shows when not mobile */}
                    <ul className='hidden sm:flex w-full h-full flex-row justify-center items-center gap-6 text-xl text-white font-light'>
                    <li className='hover:text-teal-500 hover:scale-110 active:scale-95 cursor-pointer'>Create</li>
                    <li className='hover:text-teal-500 hover:scale-110 active:scale-95 cursor-pointer'>My Words</li>
                    </ul>

                    {/*Expand more icon when mobile */}
                    <span className="sm:hidden text-5xl text-white hover:text-teal-500 hover:scale-110 active:scale-95 cursor-pointer"><i className="bi-caret-down-fill"></i></span>
                </div>
            </div>

        </>
        )
}