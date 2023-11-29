import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {GoogleOAuthProvider} from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <GoogleOAuthProvider clientId="326699364611-p9abrs8bb1hqqdtab3ehp6ubgbugenvk.apps.googleusercontent.com">
                <App/>
            </GoogleOAuthProvider>
        </BrowserRouter>
    </React.StrictMode>
);
reportWebVitals();
