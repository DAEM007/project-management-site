// All react imports
import React from "react";
import ReactDOM from "react-dom";
// All styles imports
import "./index.css";
// All App imports
import App from "./App";
// All context imports
import { AuthContextProvider } from "./context/AuthContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
