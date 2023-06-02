import { createContext, useEffect, useState } from "react";

export const DarkModeContext = createContext();


export const DarkModeContextProvider = ({children}) => {
    const [darkMode, setDarkMode] = useState(JSON.parse(localStorage.getItem("darkmode")));

    return (
        <DarkModeContext.Provider value={{darkMode, setDarkMode}}>
            {children}
        </DarkModeContext.Provider>
    );
};