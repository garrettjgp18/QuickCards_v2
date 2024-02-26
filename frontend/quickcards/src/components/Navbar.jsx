import { Link, NavLink } from 'react-router-dom'


export default function Navbar(){

    return (
        <>
        {/* Top Nav Bar */}
            <div className = "flex flex-row gap-4 h-[15vh] w-full bg-sky-950 justify-between">
                {/* Left Side */}
                {/* If icon is clicked - goes to landing page aka index "/" */}
                <Link to = "/">
                    <div className = "w-1/3 flex justify-start align-middle hover:cursor-pointer">
                        {/*Full Logo when not mobile */}
                        <img src = "src/assets/full_logo.png" className = "hidden sm:block w-full h-auto object-contain"></img>
                        {/*Just the Icon when mobile */}
                        <img src = "src/assets/logo_icon.png" className = "sm:hidden w-full h-auto object-contain"></img>

                    </div>
                </Link>
                {/* Right Side */}
                <div className = "w-1/3 flex justify-center items-center">

                    {/*Text shows when not mobile */}
                    <ul className='flex w-full h-full flex-row justify-center items-center gap-6 text-xl text-white font-light'>
                        <NavLink to="/create" className={({ isActive }) => isActive ? 'text-teal-500 hidden md:block' : 'hover:text-teal-500 hover:scale-110 active:scale-95'}>
                            <li className='cursor-pointer'>Create</li>
                        </NavLink>
                        <NavLink to="/words" className={({ isActive }) => isActive ? 'text-teal-500 hidden md:block' : 'hover:text-teal-500 hover:scale-110 active:scale-95'}>
                            <li className=' cursor-pointer'>My Words</li>
                        </NavLink>
                    </ul>

                </div>
            </div>

        </>
        )
}