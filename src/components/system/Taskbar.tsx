import React, {useContext} from "react";
import AppsContext from "../../contexts/AppsContext";
import {kebabCase} from "lodash";

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
            content: title,
        }

        startApp(newApp);
    }

    return (
        <aside className="absolute bottom-0 left-0 w-screen bg-blue-50 h-12">
            <button onClick={tmpStartApp}>Start</button>
        </aside>
    );
}
export default Taskbar;