import './App.css';
import './index.scss'
import React from 'react';
import {Route, Routes} from "react-router-dom";
import ProductsPage from "./Products/productsPage";
import PageLayout from "./pageLayout";
import Homepage from "./Homepage/homepage";
import ProductPage from "./Products/productPage";
import Login from "./Login/login";
import {ProtectedLayout} from "./Login/protectedLayout";
import CartPage from "./Cart/cartPage";

export const ProductsContext = React.createContext()
export const CartContext = React.createContext()

function App() {
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
                {/*<Route path={"/account"} element={<AccountPage />}/> TODO */}
            </Route>
        </Routes>
    )
}

export default App;
