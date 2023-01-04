import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from './redux/store';
import App from "./App";
import "./index.css";
import "../src/styles/base.scss"
import "../src/styles/colors.scss"
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
const initialState = {};

const store = configureStore(initialState);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          style={{ zIndex: 9999999 }}
        />
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
