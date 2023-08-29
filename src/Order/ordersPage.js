import {useEffect, useState} from "react";
import {useAuth} from "../Login/login";
import './order.scss'
import {useDispatch} from "react-redux";
import {useGetCartQuery} from "../Cart/Slices/apiSlice";
import {setCart} from "../Cart/Slices/cartSlice";

function Status({status}) {
    return (
        <div className={"status-container"}>
            <h3>Status: {status.status}</h3>
            <h3>Date: {status.date.split("T")[0].split("-").join(" ")}</h3>
        </div>
    )
}

function Product({product}) {
    return (
        <div className={"product-container"}>
            <img alt={product.description} src={product.thumbnail} />
            <div><h3>{product.title}</h3></div>
            <p>
                ${Math.floor(product.discountedPrice)}<br />
                <small>x{product.quantity}</small>
            </p>
        </div>
    )
}

function Order({order}) {
    return (
        <div className={"order-product-container"}>
            {order.products.map((product) => <Product key={product.id + order.date} product={product} />)}
            <h3>Total: ${Math.floor(order.discountedTotal)}</h3>
            <hr color={"black"} width={"90%"}/>
            <h3>Statuses:</h3>
            {order.status.map((status) => <Status key={status.date} status={status}/>)}
        </div>
    )
}

export default function OrdersPage() {
    const {authKey} = useAuth(),
        [orders, setOrders] = useState(),
        dispatch = useDispatch(),
        {
        data: cart
    } = useGetCartQuery(authKey ? authKey: "")
    dispatch(setCart(cart))

    const fetchOrders = async () => {
        await fetch('http://localhost:3000/order/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Internship-Auth': authKey
            }
        }).then((res) => res.json()).then((data) => setOrders(data))
    }

    useEffect(() => {
        fetchOrders()
    }, []);

    return (
        <>
            <div className={"orders-container"}>
                {orders?.map((order) => <Order key={order.date} order={order}/>)}
            </div>
        </>
    )
}