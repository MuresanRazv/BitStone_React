import './App.css';
import './index.scss'
import React from 'react';
import {Route, Routes} from "react-router-dom";
import ProductsPage from "../Products/productsPage";
import PageLayout from "./pageLayout";
import Homepage from "../Homepage/homepage";
import ProductPage from "../Products/productPage";
import Login, {useAuth} from "../Login/login";
import {ProtectedLayout} from "../Login/protectedLayout";
import CartPage from "../Cart/cartPage";
import AccountPage from "../Account/account";
import {useDispatch} from "react-redux";
import {setCart} from "../Cart/Slices/cartSlice";
import {useGetCartQuery} from "../Cart/Slices/apiSlice";
import Register from "../Register/register";
import OrderPage from "../Order/order";
import OrdersPage from "../Order/ordersPage";

function App() {
    const {authKey} = useAuth()
    const dispatch = useDispatch()
    const {
        data: cart
    } = useGetCartQuery(authKey ? authKey: "")
    dispatch(setCart(cart))

    return (
        <Routes>
            <Route element={<PageLayout />}>
                <Route path={"/"} element={<Homepage />} />
                <Route path={"/login"} element={<Login />} />
                <Route path={"/register"} element={<Register />} />
                <Route path={"/products"} element={<ProductsPage />} />
                <Route path={"/product/:product_id"} element={<ProductPage />}/>
            </Route>
            <Route path={"/user"} element={<ProtectedLayout />}>
                <Route path={"/user/cart"} element={<CartPage />}/>
                <Route path={"/user/account"} element={<AccountPage />}/>
                <Route path={"/user/order"} element={<OrderPage />}/>
                <Route path={"/user/orders"} element={<OrdersPage />}/>
            </Route>
        </Routes>
    )
}

export default App;
