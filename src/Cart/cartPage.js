import {Cart} from "./cart";
import {useAuth} from "../Login/login";
import {useEffect, useState} from "react";

export default function CartPage() {
    const { authKey } = useAuth()
    const cartObj = new Cart(authKey.data.token)
    const [cart, setCart ] = useState()

    useEffect(() => {
        setCart(cartObj.getCart())
    }, []);

    const Product = ({ product }) => {
        return (
            <div className={"cart-page-product"}>
                <img src={product.thumbnail} className={"cart-product-img"} />
                <p>{product.title}</p>
                <p>${Math.floor(product.discountedPrice)}</p>
                <div className={"cart-page-quantity"}>
                    <button className={"q-btn"} id={`minus-${product.id}`} onClick={handleMinus}>
                        <i className={"fa fa-minus"} aria-hidden={"true"} />
                    </button>
                    <p>{product.quantity}</p>
                    <button className={"q-btn"} id={`plus-${product.id}`} onClick={handlePlus}>
                        <i className={"fa fa-plus"} aria-hidden={"true"} />
                    </button>
                </div>
            </div>
        )
    }

    function handlePlus(product) {
        cartObj.updateCart([{id: product.id, quantity: 1}])
    }

    function handleMinus(product) {
        cartObj.updateCart([{id: product.id, quantity: -1}])
    }
    if (cart)
        return (
            <main className={"cart-page-main"}>
                    <div id={"products"} className={"cart-page-quantity"}>
                    {
                        cart.products.map((product) => <Product product={product} /> )
                    }
                </div>
                <p>Total: ${Math.floor(cart.discountTotal)}</p>
            </main>
        )
    return <main className={"cart-page-main"}></main>
}