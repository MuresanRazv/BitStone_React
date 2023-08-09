import Header from "./header";
import React, {useState} from "react";
import {Outlet} from "react-router-dom";
export const MiniCartContext = React.createContext()

export default function PageLayout() {
    const [ visible, setVisible ] = useState(false)

    return (
        <main>
            <MiniCartContext.Provider
                value={{
                    visibility: [visible, setVisible]
                }}
            >
                <Header />
                <Outlet />
            </MiniCartContext.Provider>
        </main>
    )
}