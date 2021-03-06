import React from 'react';
import ReactDOM from 'react-dom/client';
import {HelmetProvider} from 'react-helmet-async'
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom"
import reportWebVitals from './reportWebVitals';
import { StroeProvider } from './ConText/Store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <StroeProvider>
        <HelmetProvider>
          <PayPalScriptProvider deferLoading={true}>
            <App />
          </PayPalScriptProvider>
        </HelmetProvider>
      </StroeProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
