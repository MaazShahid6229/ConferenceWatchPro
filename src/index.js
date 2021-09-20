import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Index from "./routes/index";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
     <BrowserRouter>
      <Index />
    </BrowserRouter>,
  document.getElementById("root")
);