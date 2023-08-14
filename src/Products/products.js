import '../main/index.css'
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import useFetchProducts from "./useFetchProducts";
import {MiniCart} from "../Cart/cartPage";
import {useDispatch, useSelector} from "react-redux";
import {setPage} from "./Slices/pageSlice";
import {useUpdateCartMutation} from "../Cart/Slices/apiSlice";
import {useAuth} from "../Login/login";
import {setCart} from "../Cart/Slices/cartSlice";
import RatingPopUp, {Rating} from "./rating";

function ProductCard({ product }) {
    const { authKey } = useAuth()
    const [ clicked, setClicked ] = useState(false)
    const [ addToCart, {isLoading} ] = useUpdateCartMutation()
    const ratings = useSelector((state) => state.ratings)
    const dispatch = useDispatch()

    async function handleBuy() {
        try {
            let req = await addToCart({key: authKey.data.token, product: [{id: Number(product.id), quantity: 1}]})
            dispatch(setCart(req.data.data))
        } catch (e) {
            console.log(e.message)
        }
    }

    return (
        <div className="item-card" id={"card" + product.id}>
            <Link to={`/product/${product.id}`} className={"item-link"}>
                <img alt={product.description} id={product.id} src={product.thumbnail} className={"item-image"}/>
            </Link>
            <div className={"item-information-wrapper"}>
                <div className={"item-title-wrapper"}>
                    <h2>{product.title}</h2>
                    <p><Rating product={product} /></p>
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
    const page = useSelector((state) => state.page)

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
    const page = useSelector((state) => state.page)
    const products = useSelector((state) => state.products)
    const limit = useSelector((state) => state.limit)

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
    const filters = useSelector((state) => state.filters)
    const products = useFetchProducts(filters)

    return (
        <>
            <RatingPopUp />
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

