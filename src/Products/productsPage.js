import React, {useState} from "react";
import Header from "../header";
import Filters from "./filters";
import Products from "./products";
import {ProductsContext} from "../App";
import PageLayout from "../pageLayout";

export default function ProductsPage() {
    const [filters, setFilters] = useState([])
    const [products, setProducts] = useState([])
    const [searchInput, setSearchInputs] = useState("")
    const [page, setPage] = useState(0)
    const [limit, setLimit] = useState(5)

    let component = <main>
        <Header/>
        <ProductsContext.Provider
            value={{
                filter: [filters, setFilters],
                product: [products, setProducts],
                search: [searchInput, setSearchInputs],
                pages: [page, setPage],
                limits: [limit, setLimit]
            }}>
            <Filters/>
            <Products/>
        </ProductsContext.Provider>
    </main>

    return (
        <PageLayout component={component} />
    )
}