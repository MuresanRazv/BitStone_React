import React from 'react';
import ReactDOM from 'react-dom/client';
import './main/index.css';
import App from './main/App';
import {HashRouter} from "react-router-dom";
import {AuthProvider} from "./Login/login";
import store from "./main/store";
import {Provider} from "react-redux";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <HashRouter>
            <AuthProvider>
                <Provider store={store}>
                    <App />
                </Provider>
            </AuthProvider>
        </HashRouter>
  </React.StrictMode>
);