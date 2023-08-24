import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setProducts} from "./Slices/productsSlice";

export default function useFetchProducts(categories = []) {
    const products = useSelector((state) => state.products)
    const searchInput = useSelector((state) => state.search)
    const page = useSelector((state) => state.page)
    const limit = useSelector((state) => state.limit)
    const dispatch = useDispatch();

    useEffect(() => {
        const getData = setTimeout(() => {
            fetchProducts(categories)
        }, 500)

        return () => clearTimeout(getData)
    }, [categories, page, searchInput]);

    async function getProducts() {
        let products = localStorage.getItem("products")
        if (products !== "undefined") {
            let resultProducts = JSON.parse(products)
            // needs to be updated
            if (page * limit >= resultProducts.length)
                await fetch(`http://localhost:3000/products/product?limit=${limit}&skip=${page * limit}`)
                    .then((res) => res.json())
                    .then((data) => resultProducts = [...resultProducts, ...data])
            localStorage.setItem("products", JSON.stringify(resultProducts))
            return resultProducts
        } else {
            let resultProducts
            await fetch(`http://localhost:3000/products/product`)
                .then((res) => res.json())
                .then((data) => resultProducts = data)
            localStorage.setItem("products", JSON.stringify(resultProducts))
            return resultProducts
        }
    }

    async function getProductsByQuery(categories, input) {
        const categoriesQuery = () => {
            if (categories.length > 0) {
                return `categories=${categories.join(",")}` }
            else {
                return ""
            }
        }
        const searchQuery = () => {
            if (input.length > 0) {
                return `search=${input}`
            } else {
                return ""
            }
        }
        return await fetch(`http://localhost:3000/products/product?${categoriesQuery()}&${searchQuery()}`)
            .then(res => res.json())
    }

    const fetchProducts = async (categories = []) => {
        // fetch by categories
        let currentProducts = []
        if (categories.length > 0 || searchInput.length > 0) {
            currentProducts = await getProductsByQuery(categories, searchInput)
            dispatch(setProducts(currentProducts))
        } else {
            dispatch(setProducts(await getProducts()))
        }
    }

    let filteredProducts = products

    let length = 0
    categories.length > 0
        ? length = searchInput === "" ? products.length / limit: filteredProducts.length / limit
        : length = searchInput === "" ? (products.length + limit) / limit: filteredProducts.length / limit

    filteredProducts = filteredProducts.slice(page * limit, (page + 1) * limit)

    return { filteredProducts, length }
}
