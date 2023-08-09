import {useAuth} from "./login";
import {Link, Navigate, Outlet} from "react-router-dom";

export const ProtectedLayout = () => {
    const { logout, authKey } = useAuth()

    if (!authKey)
        return <Navigate to={"/"} />

    const LogOut = () => {
        if (authKey)
            return (
                <li>
                    <a onClick={logout}>Log Out</a>
                </li>
            )
    }

    return (
        <>
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
                                <Link to={"/user/account"} replace={true}>
                                    Account
                                </Link>
                            </li>
                            <li>
                                <Link id="cart-btn" to={!authKey ? "/login": "/user/cart"}>
                                   <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                                        <span id="cart-nr"></span>
                                </Link>
                            </li>
                            <LogOut />
                        </ul>
                    </nav>
                </div>
            </header>
            <Outlet />
        </>
    )
}