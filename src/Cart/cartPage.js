import {Cart} from "./cart";
import {useAuth} from "../Login/login";
import {useEffect, useState} from "react";

export default function CartPage() {
    const {authKey} = useAuth()
    const [cart, setCart] = useState(null)
    const cartObj = new Cart(authKey.data.token, setCart)

    useEffect( () => {
        cartObj.getCart()
    }, [])

    const Product = ({product}) => {
        return (
            <div className={"cart-page-product"}>
                <img src={product.thumbnail} className={"cart-product-img"}/>
                <p>{product.title}</p>
                <p>${Math.floor(product.discountedPrice)}</p>
                <div className={"cart-page-quantity"}>
                    <button className={"q-btn"} id={`minus-${product.id}`} onClick={(e) => { handleMinus(product); cartObj.getCart() }}>
                        <i className={"fa fa-minus"} aria-hidden={"true"}/>
                    </button>
                    <p>{product.quantity}</p>
                    <button className={"q-btn"} id={`plus-${product.id}`} onClick={(e) => { handlePlus(product); cartObj.getCart() }}>
                        <i className={"fa fa-plus"} aria-hidden={"true"}/>
                    </button>
                </div>
            </div>
        )
    }

    async function handlePlus(product) {
        await cartObj.updateCart([{id: Number(product.id), quantity: 1}])
    }

    async function handleMinus(product) {
        await cartObj.updateCart([{id: Number(product.id), quantity: -1}])
    }

    if (cart)
        return (
            <main className={"cart-page-main"}>
                <div id={"products"} className={"cart-page-quantity"}>
                    {
                        cart.products.map((product) => <Product key={product.id} product={product}/>)
                    }
                </div>
                <p>Total: ${Math.floor(cart.discountTotal)}</p>
            </main>
        )
    return <main className={"cart-page-main"}></main>
}