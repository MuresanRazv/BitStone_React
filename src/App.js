import './App.css';
import './index.css'
import React from 'react';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ProductsPage from "./Products/productsPage";
import PageLayout from "./pageLayout";
import Homepage from "./Homepage/homepage";

export const ProductsContext = React.createContext()

let router = createBrowserRouter([
    {
        path: '/products',
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
    }
])

function App() {
    return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
}

export default App;
