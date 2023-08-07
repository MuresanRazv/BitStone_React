import './App.css';
import './index.css'
import React from 'react';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ProductsPage from "./Products/productsPage";
import PageLayout from "./pageLayout";
import Homepage from "./Homepage/homepage";
import ProductPage from "./Products/productPage";

export const ProductsContext = React.createContext()

let router = createBrowserRouter([
    {
        path: '/shop',
        loader: () => ({ message: "Hello Data Router!" }),
        Component() {
            return <ProductsPage />
        }
    },
    {
        path: '/',
        loader: () => ({ message: "Hello Data Router!" }),
        Component() {
            return <PageLayout component={<Homepage />} />
        }
    },
    {
        path: '/product/:product_id',
        loader: () => ({ message: "Hello Data Router!" }),
        Component() {
            return <PageLayout component={<ProductPage />} />
        }
    }
])

function App() {
    return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
}

export default App;
