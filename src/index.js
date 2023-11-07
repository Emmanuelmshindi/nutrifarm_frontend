import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import NutriplansContextProvider from "./Context/NutriplansContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <NutriplansContextProvider>
      <App />
    </NutriplansContextProvider>
  </React.StrictMode>
);
