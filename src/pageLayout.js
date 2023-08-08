import Header from "./header";
import React from "react";
import {Outlet} from "react-router-dom";

export default function PageLayout() {
    return (
        <main>
            <Header />
            <Outlet />
        </main>
    )
}