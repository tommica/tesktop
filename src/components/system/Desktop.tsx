import React, {useContext} from 'react';
import AppWindow from "./AppWindow";
import bgImage from "@assets/bg.jpg"
import AppsContext from "../../contexts/AppsContext";

interface Props {
}

const Desktop: React.FC<Props> = (props) => {
    const {apps} = useContext(AppsContext);

    return (
        <article
            className="w-screen h-screen bg-cover bg-center bg-no-repeat"
            style={{backgroundImage: `url("${bgImage}")`}}
        >
            {apps.map(({title, id, initialY, initialX, children}) => (
                <AppWindow
                    title={title}
                    id={id}
                    initialX={initialX}
                    initialY={initialY}
                    key={id}
                >
                    {children}
                </AppWindow>
            ))}
        </article>
    )
}

export default Desktop;