import {useNavigate} from "react-router-dom";
import {useAuth} from "../Login/login";
import './order.scss'
import {useSelector} from "react-redux";

export function Product({product}) {
    return (
        <div className={"product-container"}>
            <img className={"cart-product-img"} alt={product.description} src={product.thumbnail} />
            <div><h3>{product.title}</h3></div>
            <p>
                ${Math.floor(product.discountedPrice)}<br />
                <small>x{product.quantity}</small>
            </p>
        </div>
    )
}

export default function OrderPage() {
    const {authKey} = useAuth()
    const cart = useSelector((state) => state.cart.cart)
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault()

        const data = new FormData(event.currentTarget)

        try {
            await fetch('http://localhost:3000/order/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Internship-Auth': authKey
                },
                body: JSON.stringify({
                    "order": {
                        "zip": data.get("zip"),
                        "street": data.get("street"),
                        "county": data.get("county"),
                        "city": data.get("city")
                    }
                })
            }).then(res => res.json()).then(data => {if (data.message) throw new Error(data.message)})
            navigate("/user/orders")
        } catch (err) { alert(err.message) }
    }

    return (
        <main className={"order-page-main"}>
            <div className={"products-container"}>
                {cart?.products.map((product) => <Product key={product.id} product={product}/>)}
                <hr color={"black"} width={"80%"}/>
                <h3>Total: ${Math.floor(cart?.discountedTotal)}</h3>
            </div>
            <div className={"order-container"}>
                <form onSubmit={handleSubmit} className={"order-form"}>
                    <div className={"input-container"}>
                        <label htmlFor={"zip"}>ZIP Code:</label>
                        <input type={"text"} id={"zip"} name={"zip"} required={true} />

                        <label htmlFor={"county"}>County:</label>
                        <input type={"text"} id={"county"} name={"county"} required={true} />

                        <label htmlFor={"city"}>City:</label>
                        <input type={"text"} id={"city"} name={"city"} required={true} />

                        <label htmlFor={"street"}>Street:</label>
                        <input type={"text"} id={"street"} name={"street"} required={true} />
                    </div>
                    <input type={"submit"} value={"Place order"}/>
                </form>
            </div>
        </main>
    )
}