import './index.css'
import {Link, Navigate} from "react-router-dom";
import {useAuth} from "./Login/login";

export default function Header() {
    const { logout, authKey } = useAuth()

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
                            <Link to={!authKey ? "/login": "/cart"}>
                                <a id="cart-btn"><i className="fa fa-shopping-cart" aria-hidden="true"></i>
                                <span id="cart-nr"></span></a>
                            </Link>
                        </li>
                        <LogOut />
                    </ul>
                </nav>
            </div>
        </header>
    )
}