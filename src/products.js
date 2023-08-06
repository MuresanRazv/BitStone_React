import { ProductsContext } from './App';
import './index.css'
import {useContext, useEffect, useState} from "react";

function ProductCard({ product }) {
    return (
        <div className="item-card" id={"card" + product.id}>
            <img alt = "" id={product.id} src={product.thumbnail} className={"item-image"}/>
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

function useFetchProducts(categories = [], products, setProducts, page = 0) {
    const [searchInput, setSearchInputs] = useContext(ProductsContext).search
    const [limit, setLimit] = useContext(ProductsContext).limits

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
    let slicedProducts = products.slice(page * limit, (page + 1) * limit)
    return searchInput === "" ? slicedProducts: slicedProducts.filter((product) => product.title.toLowerCase().includes(searchInput))
}

export default function Products() {
    const [ products, setProducts ] = useContext(ProductsContext).product
    const [ filters, setFilters ] = useContext(ProductsContext).filter
    const [ page, setPage ] = useContext(ProductsContext).pages
    const [ active, setActive ] = useState(null)
    const fetchedProducts = useFetchProducts(filters, products, setProducts, page)

    function PageNumBtn({number}) {
        return (
            <button key={number} className={"page-btn"} 
            onClick={() => 
                {
                    setPage(number)
                    window.scrollTo({top: 0, behavior: 'smooth'})
                }}
            style={{backgroundColor: number == page ? "gray": "lightgray"}}
            >
                {number + 1}
            </button>
        )
    }

    useEffect(() => {
        if (active) active.style.backgroundColor = "gray"
    }, [active])

    
    return (
        <div className='page-container'>
            <section id={"items"} className={"items"}>
                {fetchedProducts.map((fetchedProduct) => 
                    <ProductCard 
                    product={fetchedProduct} key={fetchedProduct.id}/>)}
            </section>
            <div className='page-buttons'>
                {[...Array(Math.ceil(products.length / 10)).keys()].map((number) => <PageNumBtn key={number} number={number} />)}
            </div>
        </div>
    )
}

