import Header from "./header";
import React from "react";

export default function PageLayout({component}) {
    return (
        <main>
            <Header />
            {component}
        </main>
    )
}