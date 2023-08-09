import './App.css';
import './index.scss'
import React, {useRef, useState} from 'react';
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

export const ProductsContext = React.createContext()
export const CartContext = React.createContext()

function App() {
    const {authKey} = useAuth()
    const [cart, setCart] = useState(null)
    const cartObj = useRef(authKey ? new Cart(authKey.data.token, setCart): null)

    return (
        <CartContext.Provider
            value={{
                cartObj: cartObj,
                cart: cart
            }}>
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
        </CartContext.Provider>
    )
}

export default App;
