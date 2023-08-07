import {ProductsContext} from './App';
import './index.css'
import {useContext, useEffect, useState} from "react";

function ProductCard({ product }) {
    return (
        <div className="item-card" id={"card" + product.id}>
            <img alt={product.description} id={product.id} src={product.thumbnail} className={"item-image"}/>
            <div className={"item-information-wrapper"}>
                <div className={"item-title-wrapper"}>
                    <h2>{product.title}</h2>
                    <p><i className="fa fa-star" aria-hidden="true"></i><span>{product.rating}</span></p>
                </div>
                <p className={"item-description"}>{product.description}</p>
                <div className={"item-title-wrapper"}>
                    <button className={"buy-btn"} id={"btn-" + product.id}>Add to cart</button>
                    <p className="price">${product.price}</p>
                </div>
            </div>
        </div>
    )
}

function PageNumBtn({number}) {
    const [ page, setPage ] = useContext(ProductsContext).pages

    return (
        <button key={number} className={"page-btn"}
                onClick={() => {
                    setPage(number)
                    window.scrollTo({top: 0, behavior: 'smooth'})
                }}
                style={{backgroundColor: number === page ? "gray" : "lightgray"}}
        >
            {number + 1}
        </button>
    )
}

function PageArrowBtn({icon}) {
    const [ page, setPage ] = useContext(ProductsContext).pages
    const [ products, setProducts ] = useContext(ProductsContext).product
    const [ limit, setLimit ] = useContext(ProductsContext).limits

    if (products.length / limit > 1)
        if (icon.split("-").slice(-1)[0] === "left")
            return (
                <button onClick={() => setPage(page - 1 >= 0 ? page - 1: products.length / limit - 1)} key={"left"}>
                    <i className={icon} aria-hidden="true"></i>
                </button>
            )
        else
            return (
                <button onClick={() => setPage(page + 1 < products.length / limit? page + 1: 0)} key={"left"}>
                    <i className={icon} aria-hidden="true"></i>
                </button>
            )
}


function useFetchProducts(categories = []) {
    const [ products, setProducts ] = useContext(ProductsContext).product
    const [ searchInput, setSearchInputs ] = useContext(ProductsContext).search
    const [ limit, setLimit ] = useContext(ProductsContext).limits
    const [ page, setPage ] = useContext(ProductsContext).pages

    useEffect(() => {
        fetchProducts(categories)
    }, [categories]);

    const fetchProducts = (categories = []) => {
        // fetch by categories
        const currentProducts = []
        if (categories.length > 0) {
            const promises = []
            for (const category of categories) {
                const promise = fetch(`https://dummyjson.com/products/category/${category}`)
                    .then(res => res.json()).then(data => data.products.forEach(
                        (product) => currentProducts.push(product))
                    )
                promises.push(promise)
            }
            Promise.all(promises).finally(() => setProducts(currentProducts))

        } else {
            fetch('https://dummyjson.com/products')
                .then(res => res.json()).then(data => {
                    setProducts(data.products)
                })
        }
    }
    let filteredProducts = searchInput === "" ? products
        : products.filter((product) => product.title.toLowerCase().includes(searchInput.toLowerCase()))

    let length = searchInput === "" ? products.length / limit: filteredProducts.length / limit

    filteredProducts = filteredProducts.slice(page * limit, (page + 1) * limit)

    return (
        <>
            <section id={"items"} className={"items"}>
                {filteredProducts.map((fetchedProduct) =>
                    <ProductCard
                        product={fetchedProduct} key={fetchedProduct.id}/>)}
            </section>
            <div className='page-buttons'>
                <PageArrowBtn icon={"fa fa-arrow-left"}/>
                {[...Array(Math.ceil(length)).keys()].map((number) => <PageNumBtn key={number} number={number} />)}
                <PageArrowBtn icon={"fa fa-arrow-right"}/>
            </div>
        </>
    )
}

export default function Products() {
    const [ filters, setFilters ] = useContext(ProductsContext).filter
    const products = useFetchProducts(filters)
    
    return (
        <div className='page-container'>
            {products}
        </div>
    )
}

