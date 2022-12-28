import React, {useContext} from 'react';
import {Rnd} from "react-rnd";
import {kebabCase} from "lodash";
import AppsContext from "../../contexts/AppsContext";

interface TitleExternalProps {
    title: string,
}

interface TitleInternalProps extends TitleExternalProps {
    dragName: string,
    dragCancelClass: string,
    onClose: () => void,
}

interface Props extends TitleExternalProps {
    children?: React.ReactNode,
    id: string,
    initialX?: number,
    initialY?: number,
}


const TitleBar: React.FC<TitleInternalProps> = ({dragCancelClass, title, onClose, dragName}) => {
    return (
        <div className={`bg-gray-700 text-white px-4 py-2 flex items-center justify-between relative ${dragName}`}>
            <div className="flex items-center">
                <div className="h-6 w-6 rounded-full bg-gray-400"></div>
                <span className="ml-2 font-semibold text-lg">
                    {title}
                </span>
            </div>
            <div className={`${dragCancelClass} flex items-center ml-2`}>
                <button className={`${dragCancelClass} p-1 rounded-full focus:outline-none hover:bg-gray-600`}>
                    <div className={`${dragCancelClass} h-6 w-6 bg-gray-400 rounded-full`}></div>
                </button>
                <button className={`${dragCancelClass} p-1 rounded-full focus:outline-none hover:bg-gray-600`}>
                    <div className={`${dragCancelClass} h-6 w-6 bg-gray-400 rounded-full`}></div>
                </button>
                <button
                    className={`${dragCancelClass} p-1 rounded-full focus:outline-none hover:bg-gray-600`}
                    onClick={onClose}
                >
                    <div className={`${dragCancelClass} h-6 w-6 bg-red-500 rounded-full`}></div>
                </button>
            </div>
        </div>

    )
}

const AppWindow: React.FC<Props> = ({
                                        id,
                                        title,
                                        children,
                                        initialX,
                                        initialY,
                                    }) => {
    const {bringToFront, closeApp} = useContext(AppsContext);

    const dragName = `drag_${kebabCase(id)}`;
    const dragCancelClass = "cancel-drag";

    return (
        <Rnd
            className="drop-shadow-lg"
            dragHandleClassName={dragName}
            cancel={`.${dragCancelClass}`}
            onDragStart={() => bringToFront(id)}
            default={{
                x: initialX || 0,
                y: initialY || 0,
                width: 600,
                height: 480
            }}
        >
            <TitleBar
                title={title}
                onClose={() => closeApp(id)}
                dragName={dragName}
                dragCancelClass={dragCancelClass}
            />

            <div className="w-full h-full bg-white">
                {children}
            </div>
        </Rnd>
    )
}

export default AppWindow;