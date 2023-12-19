import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {I18nextProvider} from "react-i18next";
import i18n from "./i18n";

const root = ReactDOM.createRoot(document.getElementById("root"));
const client = new QueryClient();

root.render(
  <React.StrictMode>
      <BrowserRouter>
          <GoogleOAuthProvider clientId="1087155119877-17kg2snmumdrhtdbioeqgspv4pcia11t.apps.googleusercontent.com">
              <QueryClientProvider client={client}>
                  <I18nextProvider i18n={i18n}>
                      <App/>
                  </I18nextProvider>
              </QueryClientProvider>
          </GoogleOAuthProvider>
      </BrowserRouter>
  </React.StrictMode>
);
reportWebVitals();
