import React from 'react';
import ReactDOM from 'react-dom/client';
import './main/index.css';
import App from './main/App';
import {BrowserRouter} from "react-router-dom";
import {AuthProvider} from "./Login/login";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <App />
            </AuthProvider>
        </BrowserRouter>
  </React.StrictMode>
);