import React, {useState} from "react";
import Filters from "./filters";
import Products from "./products";
import {ProductsContext} from "../main/App";

export default function ProductsPage() {
    return (
        <>
            <Filters/>
            <Products/>
        </>
    )
}