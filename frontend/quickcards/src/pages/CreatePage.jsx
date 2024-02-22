export default function Navbar(){

    return (
        <>

        {/*Container */}
        <div className = "h-[70vh] w-3/4 border drop-shadow-md m-auto mt-16 rounded-xl flex justify-center">
            {/*Top Box with Options */}
            <div className = "w-4/5 h-16 flex items-center justify-center">
                <ul className="w-auto flex flex-row gap-16 lg:gap-24 xl:gap-28 justify-center align-middle text-2xl md:text-xl text-gray-600">
                    {/* Hide text and show icons when in mobile view */}
                    <li className="hover:scale-110 active:scale-95 hover:text-emerald-500 cursor-pointer flex flex-row gap-2">
                        <span className="hidden sm:block">Video</span>
                        <span className="text-3xl sm:text-2xl relative bottom-0.5"><i className="bi-camera-video"></i></span>
                    </li>
                    <li className="hover:scale-110 active:scale-95 hover:text-emerald-500 cursor-pointer flex flex-row gap-2">
                        <span className="hidden sm:block">PDF</span>
                        <span className="text-3xl sm:text-2xl relative bottom-0.5"><i className="bi-file-pdf"></i></span>
                    </li>
                    <li className="hover:scale-110 active:scale-95 hover:text-emerald-500 cursor-pointer flex flex-row gap-2">
                        <span className="hidden sm:block">Text</span>
                        <span className="text-3xl sm:text-2xl relative bottom-0.5"><i className="bi-text-paragraph"></i></span>
                    </li>
                    <li className="hover:scale-110 active:scale-95 hover:text-emerald-500 cursor-pointer flex flex-row gap-2">
                        <span className="hidden sm:block">Audio</span>
                        <span className="text-3xl sm:text-2xl relative bottom-0.5"><i className="bi-headphones"></i></span>
                    </li>
                </ul>
            </div>

        </div>

        </>
        )
}