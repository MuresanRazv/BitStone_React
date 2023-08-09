import {useContext, useEffect, useState} from "react";
import {CartContext} from "../main/App";
import {MiniCartContext} from "../main/pageLayout";

export default function CartPage() {
    const cart = useContext(CartContext).cart
    const cartObj = useContext(CartContext).cartObj.current

    const Product = ({product}) => {
        return (
            <div className={"cart-page-product"}>
                <img src={product.thumbnail} className={"cart-product-img"}/>
                <p>{product.title}</p>
                <p>${Math.floor(product.discountedPrice)}</p>
                <div className={"cart-page-quantity"}>
                    <button className={"q-btn"} id={`minus-${product.id}`} onClick={() => cartObj.handleMinus(product)}>
                        <i className={"fa fa-minus"} aria-hidden={"true"}/>
                    </button>
                    <p>{product.quantity}</p>
                    <button className={"q-btn"} id={`plus-${product.id}`} onClick={() => cartObj.handlePlus(product)}>
                        <i className={"fa fa-plus"} aria-hidden={"true"}/>
                    </button>
                </div>
            </div>
        )
    }

    if (cart)
        return (
            <main className={"cart-page-main"}>
                <div key={"products"} className={"cart-page-products"}>
                    {cart ? cart.products.map((product) => <Product key={product.id} product={product}/>): ""}
                </div>
                <p>Total: ${Math.floor(cart.discountTotal)}</p>
            </main>
        )
    return <main className={"cart-page-main"}></main>
}

export function MiniCart() {
    const cart = useContext(CartContext).cart
    const [ visible, setVisible ] = useContext(MiniCartContext).visibility


    return (
        <>
            { visible && cart ? (
                <div id={"cart"} className={"cartVisible"} onMouseLeave={() => setVisible(false)}>
        {cart.products.map((product) =>
            <div className="cart-product" key={product.id}>
                <div className="cart-product-info">
                    <img src={product.thumbnail} className="cart-product-img" />
                    <p>{product.title}</p>
                </div>
                <p>
                    x{product.quantity}<br />
                    <small>${Math.floor((100.0 - product.discountPercentage) / 100 * product.price)}</small>
                </p>
            </div>
        )}
        </div>
    ) : ""}
        </>
    )
}