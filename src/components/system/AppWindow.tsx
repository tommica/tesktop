import React, {useContext, useRef, useState} from 'react';
import {Rnd} from "react-rnd";
import {kebabCase} from "lodash";
import AppsContext from "../../contexts/AppsContext";
import {CgMaximizeAlt, RiCloseFill, VscChromeMinimize} from "react-icons/all";

interface TitleExternalProps {
    title: string,
}

interface TitleInternalProps extends TitleExternalProps {
    dragName: string,
    dragCancelClass: string,
    onClose: () => void,
    onMinimize: () => void,
    onMaximize: () => void,
}

interface Props extends TitleExternalProps {
    children?: React.ReactNode,
    id: string,
    initialX?: number,
    initialY?: number,
    fill?: boolean,
}


const TitleBar: React.FC<TitleInternalProps> = (
    {
        dragCancelClass,
        title,
        onClose,
        dragName,
        onMinimize,
        onMaximize
    }
) => {
    const buttonClasses = `${dragCancelClass} p-2 rounded-full text-gray-700 hover:bg-gray-400 focus:outline-none focus:shadow-outline text-xl`;

    return (
        <div className={`flex items-center justify-between px-4 py-1 bg-gray-300 ${dragName}`}>
            <div className={`font-bold text-lg`}>{title}</div>
            <div className={`${dragCancelClass} flex`}>
                <button
                    onClick={onMinimize}
                    className={buttonClasses}
                >
                    <VscChromeMinimize/>
                </button>
                <button
                    onClick={onMaximize}
                    className={buttonClasses}
                >
                    <CgMaximizeAlt/>
                </button>
                <button
                    onClick={onClose}
                    className={buttonClasses}
                >
                    <RiCloseFill/>
                </button>
            </div>
        </div>
    )
}

type WindowStatusType = "float" | "minimized" | "maximized";

interface PreviousDragDataType {
    x: number,
    y: number,
    width: number,
    height: number,
}

const AppWindow: React.FC<Props> = ({
                                        id,
                                        title,
                                        children,
                                        initialX,
                                        initialY,
                                        fill,
                                    }) => {
    // Bring-to-front is handled in the context, because it is about which app is
    // at the tail-end of the list
    const {bringToFront, closeApp} = useContext(AppsContext);
    const [status, setStatus] = useState<WindowStatusType>("float");

    // Snapshot is used when window is maximized, and then maximized again
    //  so we can restore it to the size and place that it was alredy in.
    const [placementSnapshot, setPlacementSnapshot] = useState<PreviousDragDataType>({
        x: initialX || 0,
        y: initialY || 0,
        width: 600,
        height: 420,
    })
    const windowRef = useRef<Rnd>(null);

    // We are sanitizing the id just in case - should never be necessary, but not
    // sure how to enforce a slug-type in ts.
    const dragName = `drag_${kebabCase(id)}`;
    const dragCancelClass = "cancel-drag";

    const changeStatus = (newStatus: WindowStatusType) => {
        let finalStatus = newStatus;

        if (windowRef.current?.resizable) {
            if (newStatus === "maximized" && status === "maximized") {
                // If the user is going back to the floating status for the window
                // by "re-maximizing", then we just restore the data from the stored
                // snapshot
                finalStatus = "float";
                windowRef.current.updateSize({
                    width: placementSnapshot.width,
                    height: placementSnapshot.height
                });
                windowRef.current.updatePosition({
                    x: placementSnapshot.x,
                    y: placementSnapshot.y
                });
            } else if (newStatus === "maximized") {
                // Snapshot the current position and size
                const currentPosition = windowRef.current.getDraggablePosition();
                const currentSize = windowRef.current.resizable.size;
                setPlacementSnapshot({
                    x: currentPosition.x,
                    y: currentPosition.y,
                    width: currentSize.width,
                    height: currentSize.height
                })

                // Maximize the screen
                // TODO: I expect there to be issues when the taskbar is position
                //  absolute, somehow limit the desktop size to be 100%-taskbar height
                windowRef.current.updateSize({width: "100%", height: "100%"});
                windowRef.current.updatePosition({x: 0, y: 0});
            }

            setStatus(finalStatus);

            // TODO: Wanted to add a classic minimizing animation, just have no clue how to do it yet.
        }
    }

    return (
        <Rnd
            className={`${status === "minimized" ? "invisible" : ""} rounded-lg bg-white shadow-xl`}
            dragHandleClassName={dragName}
            cancel={`.${dragCancelClass}`}
            disableDragging={status === "maximized"}
            onMouseDown={() => bringToFront(id)}
            ref={windowRef}
            default={placementSnapshot}
        >
            <TitleBar
                title={title}
                onClose={() => closeApp(id)}
                onMinimize={() => changeStatus("minimized")}
                onMaximize={() => changeStatus("maximized")}
                dragName={dragName}
                dragCancelClass={dragCancelClass}
            />

            <div className={`w-full h-full ${fill ? "" : "px-4 py-2"}`}>
                {children}
            </div>
        </Rnd>
    )
}

export default AppWindow;