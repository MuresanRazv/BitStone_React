import {useDispatch, useSelector} from "react-redux";
import {setVisible} from "./Slices/visibleSlice";
import {setCart} from "./Slices/cartSlice";
import {useUpdateCartMutation} from "./Slices/apiSlice";
import {useAuth} from "../Login/login";

export default function CartPage() {
    const cart = useSelector((state) => state.cart.cart)
    const [ addToCart, {isLoading} ] = useUpdateCartMutation()
    const dispatch = useDispatch()
    const { authKey } = useAuth()

    async function handlePlus(product) {
        try {
            let req = await addToCart({key: authKey.data.token, product: [{id: Number(product.id), quantity: 1}]})
            dispatch(setCart(req.data.data))
        } catch (e) {
            console.log(e.message)
        }
    }

    async function handleMinus(product) {
        try {
            let req = await addToCart({key: authKey.data.token, product: [{id: Number(product.id), quantity: -1}]})
            dispatch(setCart(req.data.data))
        } catch (e) {
            console.log(e.message)
        }
    }

    const Product = ({product}) => {
        return (
            <div className={"cart-page-product"}>
                <img src={product.thumbnail} className={"cart-product-img"}/>
                <p>{product.title}</p>
                <p>${Math.floor(product.discountedPrice)}</p>
                <div className={"cart-page-quantity"}>
                    <button className={"q-btn"} id={`minus-${product.id}`} onClick={() => handleMinus(product)}>
                        <i className={"fa fa-minus"} aria-hidden={"true"}/>
                    </button>
                    <p>{product.quantity}</p>
                    <button className={"q-btn"} id={`plus-${product.id}`} onClick={() => handlePlus(product)}>
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
    const cart = useSelector((state) => state.cart.cart)
    const visible = useSelector((state) => state.visible)
    const dispatch = useDispatch()

    return (
        <>
            { visible && cart ? (
                <div id={"cart"} className={"cartVisible"} onMouseLeave={() => dispatch(setVisible(false))}>
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