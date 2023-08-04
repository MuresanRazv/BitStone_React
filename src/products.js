import './index.css'
import {useEffect, useState} from "react";

function ProductCard({ product }) {
    return (
        <div className="item-card" id={"card" + product.id}>
            <img alt = "" id={product.id} src={product.thumbnail} className={"item-image"}/>
            <div className={"item-information-wrapper"}>
                <div className={"item-title-wrapper"}>
                    <h2>{product.title}</h2>
                    <p><i className="fa fa-star" aria-hidden="true"></i><span> ${product.rating}</span></p>
                </div>
                <p className={"item-description"}>{product.description}</p>
                <div className={"item-title-wrapper"}>
                    <button className={"buy-btn"} id={"btn-" + product.id}>Add to cart</button>
                </div>
            </div>
        </div>
    )
}

function useFetchProducts(categories = []) {
    const [products, setProducts] = useState([])

    useEffect(() => {
        fetchProducts(categories)
    }, []);

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
    return products
}

export default function Products() {
    const fetchedProducts = useFetchProducts(["smartphones"])
    return (
        <section id={"items"} className={"items"}>
            {fetchedProducts.map((fetchedProduct) => <ProductCard product={fetchedProduct} key={fetchedProduct.id}/>)}
        </section>
    )
}

