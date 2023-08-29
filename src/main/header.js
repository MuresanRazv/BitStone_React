import './index.css'
import {Link} from "react-router-dom";
import {useAuth} from "../Login/login";
import {useDispatch, useSelector} from "react-redux";
import {setVisible} from "../Cart/Slices/visibleSlice";

export default function Header() {
    const { logout, authKey } = useAuth(),
        cart = useSelector((state) => state.cart.cart),
        dispatch = useDispatch()

    const LogOut = () => {
        if (authKey)
            return (
                <li>
                    <button
                        className={"logout-btn"}
                        onClick={logout}>Log Out</button>
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
                        {authKey ?
                            <li>
                                <div className={"header-dropdown"}>
                                    <Link className={"dropdown-btn"}>Account</Link>
                                    <div className={"dropdown-content"}>
                                        <Link to={"/user/orders"}>
                                            Orders
                                        </Link>
                                    </div>
                                </div>
                            </li>
                            : ""}
                        <li>
                            <Link
                                id="cart-btn" to={!authKey ? "/login": "/user/cart"}
                                onMouseEnter={() => dispatch(setVisible(true))}
                            >
                                <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                                <span id="cart-nr">  {cart && authKey ? cart.totalProducts: ""}</span>
                            </Link>
                        </li>
                        <LogOut />
                    </ul>
                </nav>
            </div>
        </header>
    )
}