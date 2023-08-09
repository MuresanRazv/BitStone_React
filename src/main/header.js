import './index.css'
import {Link, Navigate} from "react-router-dom";
import {useAuth} from "../Login/login";
import {MiniCart} from "../Cart/cartPage";
import {useContext} from "react";
import {CartContext} from "./App";
import {MiniCartContext} from "./pageLayout";

export default function Header() {
    const { logout, authKey } = useAuth()
    const cart = useContext(CartContext).cart
    const [ visible, setVisible ] = useContext(MiniCartContext).visibility

    const LogOut = () => {
        if (authKey)
            return (
                <li>
                    <a onClick={logout}>Log Out</a>
                </li>
            )
    }

    return (
        <header id={"header"}>
            <div className={"container"}>
                <h3>Razvan's shop</h3>
                <nav>
                    <ul>
                        <li>
                            <Link to={"/"}>Home</Link>
                        </li>
                        <li>
                            <Link to={"/products"}>Products</Link>
                        </li>
                        <li>
                            <Link
                                id="cart-btn" to={!authKey ? "/login": "/user/cart"}
                                onMouseEnter={() => setVisible(true)}
                            >
                                <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                                <span id="cart-nr">  {cart ? cart.totalProducts: ""}</span>
                            </Link>
                        </li>
                        <LogOut />
                    </ul>
                </nav>
            </div>
        </header>
    )
}