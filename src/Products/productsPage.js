import React, {useState} from "react";
import Filters from "./filters";
import Products from "./products";
import {CartContext, ProductsContext} from "../App";

export default function ProductsPage() {
    const [filters, setFilters] = useState([])
    const [products, setProducts] = useState([])
    const [searchInput, setSearchInputs] = useState("")
    const [page, setPage] = useState(0)
    const [limit, setLimit] = useState(5)
    const [cart, setCart] = useState()

    return (
        <ProductsContext.Provider
            value={{
                filter: [filters, setFilters],
                product: [products, setProducts],
                search: [searchInput, setSearchInputs],
                pages: [page, setPage],
                limits: [limit, setLimit]
            }}>
            <Filters/>
            <CartContext.Provider
                value={{
                    cart: [cart, setCart]
                }}
                >
                <Products/>
            </CartContext.Provider>
        </ProductsContext.Provider>
    )
}