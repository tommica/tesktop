import React, {useContext} from "react";
import AppsContext from "../../contexts/AppsContext";
import {kebabCase, random} from "lodash";

const Taskbar = () => {
    const {startApp} = useContext(AppsContext);

    const tmpStartApp = () => {
        const x = Math.floor(Math.random() * window.innerWidth - 200)
        const y = Math.floor(Math.random() * window.innerHeight - 200)

        const title = `Random: ${x} ${y}`;

        const newApp = {
            title: title,
            id: kebabCase(title),
            initialX: x < 0 ? 0 : x,
            initialY: y < 0 ? 0 : y,
            children: (<>{title}</>),
            fill: random(10) > 5
        }

        startApp(newApp);
    }

    return (
        <div className="absolute bottom-0 left-0 right-0">
            <nav className="bg-gray-800 h-12 flex items-center justify-between px-4">
                <div className="flex items-center">
                    <button className="text-gray-500 hover:text-white focus:outline-none focus:text-white mr-4">
                        <svg className="h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
                        </svg>
                    </button>
                    <div className="flex items-center ml-4 text-white font-bold">
                        Taskbar
                    </div>
                </div>
                <div className="flex items-center">
                    <button className="text-gray-500 hover:text-white focus:outline-none focus:text-white mr-4">
                        <svg className="h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                        </svg>
                    </button>
                    <button onClick={tmpStartApp} className="flex items-center mr-4 text-white font-bold">
                        Start
                    </button>
                </div>
                <div className="flex items-center">
                    <div className="relative">
                        <button className="text-gray-500 hover:text-white focus:outline-none focus:text-white mr-4">
                            <svg className="h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 24 24">
                                <path
                                    d="M19.48 13.03A4 4 0 0116 19h-4a4 4 0 01-3.48-6.03A4 4 0 0111 15H8v-4a7 7 0 016.48-6.97zM10 11a2 2 0 10-.01-4.01A2 2 0 0010 11z"/>
                            </svg>
                        </button>
                        <div
                            className="absolute right-0 z-10 bg-gray-800 rounded-full h-6 w-6 flex items-center justify-center text-white font-bold">
                            3
                        </div>
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="text-white font-bold">
                        14:32
                    </div>
                </div>
            </nav>
        </div>
    );
}
export default Taskbar;