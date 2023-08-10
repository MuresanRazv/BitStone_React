import './App.css';
import './index.scss'
import React, {useEffect, useRef, useState} from 'react';
import {Route, Routes} from "react-router-dom";
import ProductsPage from "../Products/productsPage";
import PageLayout from "./pageLayout";
import Homepage from "../Homepage/homepage";
import ProductPage from "../Products/productPage";
import Login, {useAuth} from "../Login/login";
import {ProtectedLayout} from "../Login/protectedLayout";
import CartPage from "../Cart/cartPage";
import AccountPage from "../Account/account";
import {Cart} from "../Cart/cart";
import {useDispatch, useSelector} from "react-redux";
import {setCart} from "../Cart/Slices/cartSlice";

export const ProductsContext = React.createContext()
export const CartContext = React.createContext()

function App() {
    const {authKey} = useAuth()
    const dispatch = useDispatch()

    const cartObj = useRef(new Cart(null, setCart))

    useEffect( () => {
        if (authKey) {
            cartObj.current.setKey(authKey.data.token)
            cartObj.current.getCart().then((res) => dispatch(setCart(res)))
        }
        else dispatch(setCart(null))
    }, [authKey])

    return (
        <Routes>
            <Route element={<PageLayout />}>
                <Route path={"/"} element={<Homepage />} />
                <Route path={"/login"} element={<Login />} />
                <Route path={"/products"} element={<ProductsPage />} />
                <Route path={"/product/:product_id"} element={<ProductPage />}/>
            </Route>
                <Route path={"/user"} element={<ProtectedLayout />}>
                    <Route path={"/user/cart"} element={<CartPage />}/>
                    <Route path={"/user/account"} element={<AccountPage />}/>
                </Route>
        </Routes>
    )
}

export default App;
