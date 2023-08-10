import './index.css'
import {Link} from "react-router-dom";
import {useAuth} from "../Login/login";
import {useDispatch, useSelector} from "react-redux";
import {setVisible} from "../Cart/Slices/visibleSlice";

export default function Header() {
    const { logout, authKey } = useAuth()
    const cart = useSelector((state) => state.cart.cart)
    const dispatch = useDispatch()

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
                                onMouseEnter={() => dispatch(setVisible(true))}
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