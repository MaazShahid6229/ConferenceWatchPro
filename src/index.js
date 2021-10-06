import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Route from "./routes/Routes";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
     <BrowserRouter>
      <Route />
    </BrowserRouter>,
  document.getElementById("root")
);