import {useContext, useEffect, useState} from "react";
import {ProductsContext} from "../main/App";

export default function useFetchProducts(categories = []) {
    const [ products, setProducts ] = useContext(ProductsContext).product
    const [ searchInput, setSearchInputs ] = useContext(ProductsContext).search
    const [ limit, setLimit ] = useContext(ProductsContext).limits
    const [ page, setPage ] = useContext(ProductsContext).pages
    const [ totalLength, setTotalLength ] = useState(0)

    useEffect(() => {
        fetchProducts(categories)
    }, [categories, page]);

    async function getProducts() {
        let products = localStorage.getItem("products")
        if (products) {
            let resultProducts = JSON.parse(products)
            // needs to be updated
            if (page * limit >= resultProducts.length)
                await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${page * limit}`)
                    .then((res) => res.json())
                    .then((data) => resultProducts = [...resultProducts, ...data.products])

            localStorage.setItem("products", JSON.stringify(resultProducts))
            return resultProducts
        } else {
            let resultProducts
            await fetch(`https://dummyjson.com/products`)
                .then((res) => res.json())
                .then((data) => resultProducts = data.products)
            localStorage.setItem("products", JSON.stringify(resultProducts))
            return resultProducts
        }
    }

    async function getProductsByCategory(category) {
        let productsByCategory = localStorage.getItem("productsByCategory")

        if (!productsByCategory) localStorage.setItem("productsByCategory", "{}")

        let allCategories = JSON.parse(productsByCategory)
        // needs to be updated
        if (!allCategories[category]) {
            await fetch(`https://dummyjson.com/products/category/${category}`)
                .then(res => res.json())
                .then(data => allCategories[category] = data.products)
        }

        localStorage.setItem("productsByCategory", JSON.stringify(allCategories))
        return allCategories[category]
    }

    const fetchProducts = async (categories = []) => {
        // fetch by categories
        let currentProducts = []
        if (categories.length > 0) {
            for (const category of categories) {
                currentProducts = [...currentProducts, ...await getProductsByCategory(category)]
            }
            setProducts(currentProducts)
        } else {
            setProducts(await getProducts())
        }
    }

    let filteredProducts = searchInput === "" ? products
        : products.filter((product) => product.title.toLowerCase().includes(searchInput.toLowerCase()))

    let length

    categories.length > 0
        ? length = searchInput === "" ? products.length / limit: filteredProducts.length / limit
        : length = searchInput === "" ? (products.length + limit) / limit: filteredProducts.length / limit

    filteredProducts = filteredProducts.slice(page * limit, (page + 1) * limit)

    return { filteredProducts, length }
}
