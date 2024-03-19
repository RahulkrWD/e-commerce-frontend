import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import cart from "./store";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={cart}>
    {" "}
    {/* Wrap your App with Provider */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

reportWebVitals();
