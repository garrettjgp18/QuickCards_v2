
export default function Modal(){

    return (
        <>
        {/* Overlay */}
        <div v-show="modalActive" class = "absolute w-full bg-black bg-opacity-50 h-screen top-0 left-0 flex justify-center px-8">
            <div v-if = "modalActive" class="p-4 bg-white self-start mt-32 max-w-screen-md w-96 h-80 rounded-lg border overflow-auto">
                <a  class = "float-right active:scale-95  hover:scale-110 cursor-pointer"><span class="text-4xl text-gray-500 hover:text-gray-600 active:text-gray-500"><i class="bi-x"></i></span></a>
                <div class = "flex flex-col w-full h-full gap-8 items-center">
                    
                    <slot />

                </div>
            </div>
        </div>

    </>
    )
}