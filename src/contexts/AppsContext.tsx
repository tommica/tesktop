import React, {createContext, useState} from "react";
import {sortBy} from "lodash";

interface AppItem {
    title: string,
    id: string,
    initialX: number,
    initialY: number,
    content: string,
    zIndex?: number,
}

interface AppsContextType {
    apps: AppItem[]
    startApp: (app: AppItem) => void,
    closeApp: (id: string) => void
    bringToFront: (id: string) => void
}

const defaultState = {
    apps: [],
    startApp: (app: AppItem) => {
    },
    closeApp: (id: string) => {
    },
    bringToFront: (id: string) => {
    },
}

const AppsContext = createContext<AppsContextType>(defaultState);

export const AppsContextProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [apps, setApps] = useState<AppItem[]>([]);

    const startApp = (newApp: AppItem) => {
        setApps([...apps, newApp]);
    }

    const closeApp = (id: string) => {
        const newApps = apps.filter((app) => app.id !== id);
        setApps(newApps);
    }

    const bringToFront = (id: string) => {
        const newApps = sortBy([...apps], (app => app.id === id ? 1 : 0))
        setApps(newApps);
    }

    return (
        <AppsContext.Provider
            value={
                {
                    apps,
                    startApp,
                    closeApp,
                    bringToFront
                }
            }
        >
            {children}
        </AppsContext.Provider>
    )
}

export default AppsContext;