import {useAuth} from "./login";
import {Link, Navigate, Outlet} from "react-router-dom";

export const ProtectedLayout = () => {
    const { authKey } = useAuth()

    if (!authKey)
        return <Navigate to={"/"} />

    return (
        <div>
            <nav>
                <Link to={"/cart"}>Cart</Link>
                <Link to={"/account"}>Account</Link>
            </nav>
            <Outlet />
        </div>
    )
}