import {CartContext, ProductsContext} from '../main/App';
import '../main/index.css'
import {useContext, useState} from "react";
import {Link} from "react-router-dom";
import useFetchProducts from "./useFetchProducts";
import {MiniCart} from "../Cart/cartPage";

function ProductCard({ product }) {
    const [ clicked, setClicked ] = useState(false)
    const cartObj = useContext(CartContext).cartObj.current

    function handleBuy() {
        if (cartObj) cartObj.handlePlus(product)
    }

    return (
        <div className="item-card" id={"card" + product.id}>
            <Link to={`/product/${product.id}`} className={"item-link"}>
                <img alt={product.description} id={product.id} src={product.thumbnail} className={"item-image"}/>
            </Link>
            <div className={"item-information-wrapper"}>
                <div className={"item-title-wrapper"}>
                    <h2>{product.title}</h2>
                    <p><i className="fa fa-star" aria-hidden="true"></i><span>{product.rating}</span></p>
                </div>
                <p className={"item-description"}>{product.description}</p>
                <div className={"item-title-wrapper"}>
                    <button
                        className={clicked ? "buy-btn-clicked": "buy-btn"}
                        id={"btn-" + product.id}
                        onClick={handleBuy}
                        >
                            { clicked ? "Added to cart": "Add to cart" }
                    </button>
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
                <button onClick={() => setPage(page - 1 >= 0 ? page - 1: (products.length + limit) / limit - 1)} key={"left"}>
                    <i className={icon} aria-hidden="true"></i>
                </button>
            )
        else
            return (
                <button onClick={() => setPage(page + 1 < (products.length + limit) / limit - 1? page + 1: 0)} key={"left"}>
                    <i className={icon} aria-hidden="true"></i>
                </button>
            )
}

export default function Products() {
    const [ filters, setFilters ] = useContext(ProductsContext).filter
    const products = useFetchProducts(filters)
    
    return (
        <>
            <MiniCart />
            <div className='page-container'>
                <section id={"items"} className={"items"}>
                    {products.filteredProducts.map((fetchedProduct) =>
                        <ProductCard
                            product={fetchedProduct} key={fetchedProduct.id}/>)}
                </section>
                <div className='page-buttons'>
                    <PageArrowBtn icon={"fa fa-arrow-left"}/>
                    {[...Array(Math.ceil(products.length)).keys()].map((number) => <PageNumBtn key={number} number={number} />)}
                    <PageArrowBtn icon={"fa fa-arrow-right"}/>
                </div>
            </div>
        </>
    )
}

